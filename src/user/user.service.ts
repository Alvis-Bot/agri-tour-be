import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { User } from "../common/entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserCreateDto } from "./dto/user-create.dto";
import { ApiException } from "../exception/api.exception";
import { Pagination } from "../common/pagination/pagination.dto";
import { PaginationModel } from "../common/pagination/pagination.model";
import { Meta } from "../common/pagination/meta.dto";
import { ErrorMessages } from "../exception/error.code";
import { Role } from "src/common/enum";
import { UserUpdateDto } from "./dto/user-update.dto";

@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private usersRepository: Repository<User>) { }

  async createUser(dto: UserCreateDto): Promise<User> {
    if (await this.existsUsername(dto.username)) {
      throw new ApiException(ErrorMessages.USER_ALREADY_EXIST);
    }
    const userCreated = this.usersRepository.create({
      ...dto,
    });
    return this.usersRepository.save(userCreated);
  }
  async updateUser(id: string, dto: UserUpdateDto): Promise<User | any> {
    try {

      const user = await this.getUserById(id);
      const merged = this.usersRepository.merge(user, {
        ...dto
      })
      await this.usersRepository.update(id, merged);
      return await this.getUserById(id)
    } catch (error) {
      throw new ApiException(ErrorMessages.BAD_REQUEST, `Update User failed with error: ${error}`);
    }
  }
  async grantAccessAdmin(id: string): Promise<User> {
    try {
      const user = await this.getUserById(id);
      return await this.usersRepository.save({
        ...user,
        role: Role.ADMIN
      })
    } catch (error) {
      throw new ApiException(ErrorMessages.BAD_REQUEST, "Error grant access admin")
    }
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.usersRepository.
      createQueryBuilder('user')
      .where('user.id = :id', { id })
      .getOne();
    if (!user) {
      throw new ApiException(ErrorMessages.USER_NOT_FOUND);
    } else if (user.isLocked) {
      throw new ForbiddenException("Account is locked")
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
    return await this.usersRepository.exist({ where: { username } })
  }

  async getUsers(pagination: Pagination) {
    const queryBuilder = this.usersRepository
      .createQueryBuilder("user")
      .orderBy("user.createdAt", pagination.order)
      .take(pagination.take)
      .skip(pagination.skip)

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const meta = new Meta({ itemCount, pagination });
    return new PaginationModel(entities, meta);

  }

}
