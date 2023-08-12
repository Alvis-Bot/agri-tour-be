import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { User } from "../common/entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import {  Repository } from "typeorm";
import { UserCreateDto } from "./dto/user-create.dto";
import { ApiException } from "../exception/api.exception";
import { Pagination } from "../common/pagination/pagination.dto";
import { PaginationModel } from "../common/pagination/pagination.model";
import { Meta } from "../common/pagination/meta.dto";
import { UpdateUserDto } from "src/user/dto/update-user.dto";
import {ErrorMessages} from "../exception/error.code";
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
    return   await this.usersRepository.exist({ where: { username } })
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
