import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { User } from "../../common/entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { UserCreateDto } from "../../common/dto/user-create.dto";
import { ApiException } from "../../exception/api.exception";
import { ErrorCode } from "../../exception/error.code";
import { Permission } from "../../common/entities/permission.entity";
import { Pagination } from "../../common/pagination/pagination.dto";
import { PaginationModel } from "../../common/pagination/pagination.model";
import { Meta } from "../../common/pagination/meta.dto";
import { CreateLocationDto } from "../../common/dto/create-location.dto";
import { Farm } from "../../common/entities/farm.entity";
import { IUserService } from "./user";
import { UpdateUserDto } from "src/common/dto/update-user.dto";
@Injectable()
export class UserService implements IUserService {

  constructor(@InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Permission) private permissionRepository: Repository<Permission>,
    @InjectRepository(Farm) private farmRepository: Repository<Farm>,) { }

  async createUser(dto: UserCreateDto): Promise<User> {
    if (await this.existsUsername(dto.username)) {
      throw new ApiException(ErrorCode.USER_ALREADY_EXIST);
    }
    const userEntity = this.usersRepository.create({
      ...dto,
    });
    return this.usersRepository.save(userEntity);
  }

  async getUserById(id: string): Promise<User> {
    const user = this.usersRepository.
      createQueryBuilder('user')
      .where('user.id = :id', { id })
      .andWhere('user.isLocked = :isLocked', { isLocked: false })
      .getOne();
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return user;
  }

  async getUserByUserName(username: string): Promise<User> {
    return this.usersRepository.
      createQueryBuilder('user')
      .where('user.username = :username', { username })
      .getOne();
  }

  async existsUsername(username: string): Promise<boolean> {
    const user = await this.usersRepository.exist({ where: { username } })
    return !!user;
  }
  async updateUser(myUser: User) {
    return await this.usersRepository.save(myUser);
  }
  async updateUserCustom(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const merged = this.usersRepository.merge(user, updateUserDto);

    const updated = await this.usersRepository.update(id, merged);
    if (!updated) {
      throw new BadRequestException(
        "User update failed"
      )
    }
    return merged;
  }

  async getUsers(pagination: Pagination) {
    console.log("pagination", pagination.skip);
    const queryBuilder = this.usersRepository
      .createQueryBuilder("user")
      .orderBy("user.createdAt", pagination.order)
      .take(pagination.take)
      .skip(pagination.skip)

    console.log("queryBuilder", queryBuilder.getSql());

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();
    console.log('sql', queryBuilder.getSql())
    console.log("entities", entities);
    console.log("entities", itemCount);

    const meta = new Meta({ itemCount, pagination });
    return new PaginationModel(entities, meta);

  }

}
