import { Injectable, OnModuleInit } from '@nestjs/common';
import { User } from '../common/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserCreateDto } from './dto/user-create.dto';
import { ApiException } from '../exception/api.exception';
import { Pagination } from '../common/pagination/pagination.dto';
import { PaginationModel } from '../common/pagination/pagination.model';
import { Meta } from '../common/pagination/meta.dto';
import { ErrorMessages } from '../exception/error.code';
import { Role } from 'src/common/enum';
import {
  UserUpdateDto,
  UserUpdateProfileByManagerDto,
} from './dto/user-update.dto';
import { MulterUtils } from '../common/utils/multer.utils';
import { hash } from 'bcrypt';
import { isNotEmpty } from 'class-validator';
import { DeleteResponse } from '../common/type';

@Injectable()
export class UserService implements OnModuleInit {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async onModuleInit() {
    // xóa toàn bộ user có role là khác ADMIN
    // await this.usersRepository.delete({ id : 'fba35ebc-85ab-4e1e-ab77-180e30614dfe' });
  }

  async removeUser(id: string): Promise<DeleteResponse> {
    // tìm user có role ADMIN thì không xóa
    const user = await this.getUserById(id);
    if (user.role === Role.ADMIN) {
      throw new ApiException(ErrorMessages.CANNOT_DELETE_ADMIN);
    }
    const queryBuilder = this.usersRepository
      .createQueryBuilder()
      .delete()
      .from(User)
      .where('id = :id', { id })
      .returning('id');
    const execute = await queryBuilder.execute();
    return {
      message: 'User deleted successfully',
      id: execute.raw[0].id,
    };
  }

  async createProfileUser(
    dto: UserCreateDto,
    avatar?: Express.Multer.File,
  ): Promise<User> {
    // kiểm tra username đã tồn tại chưa
    if (await this.existsUsername(dto.username)) {
      throw new ApiException(ErrorMessages.USER_ALREADY_EXIST);
    }

    // kiểm tra email đã tồn tại chưa
    if (await this.existsEmail(dto.email)) {
      throw new ApiException(ErrorMessages.EMAIL_ALREADY_EXIST);
    }

    if (
      isNotEmpty(dto.phoneNumber) &&
      (await this.existsPhoneNumber(dto.phoneNumber))
    ) {
      throw new ApiException(ErrorMessages.PHONE_NUMBER_ALREADY_EXIST);
    }
    // taọ user
    const queryBuilder = this.usersRepository
      .createQueryBuilder()
      .insert()
      .into(User)
      .values({
        ...dto,
        password: await hash(dto.password, 10),
        avatar: avatar ? MulterUtils.convertPathToUrl(avatar.path) : null,
      })
      .returning('*');
    const execute = await queryBuilder.execute();
    return execute.raw[0];
  }

  async existsPhoneNumber(phoneNumber: string): Promise<boolean> {
    return await this.usersRepository.exist({ where: { phoneNumber } });
  }

  async existsEmail(email: string): Promise<boolean> {
    return await this.usersRepository.exist({ where: { email } });
  }

  async updateProfile(
    user: User,
    dto: UserUpdateDto,
    avatar?: Express.Multer.File,
  ): Promise<User> {
    console.log('dto', isNotEmpty(user.avatar));
    // nếu có avatar thì xóa avatar cũ
    isNotEmpty(user.avatar) && MulterUtils.deleteFile(user.avatar);

    console.log('dto', avatar);
    // update user
    const queryBuilder = this.usersRepository
      .createQueryBuilder()
      .update()
      .set({
        ...dto,
        avatar: isNotEmpty(avatar)
          ? MulterUtils.convertPathToUrl(avatar.path)
          : user.avatar,
      })
      .where('id = :id', { id: user.id })
      .returning('*');
    const execute = await queryBuilder.execute();
    return execute.raw[0];
  }

  async updateUserInfoByManager(
    myUser: User,
    dto: UserUpdateProfileByManagerDto,
  ): Promise<User> {
    if (myUser.role === Role.ADMIN) {
      throw new ApiException(ErrorMessages.CANNOT_UPDATE_ADMIN);
    }
    // lưu dữ liệu mới
    const queryBuilder = this.usersRepository
      .createQueryBuilder()
      .update()
      .set({
        ...dto,
        password: dto.password ? await hash(dto.password, 10) : myUser.password,
      })
      .where('id = :id', { id: myUser.id })
      .returning('*');
    const execute = await queryBuilder.execute();
    return execute.raw[0];
  }

  async assignAdminRole(id: string): Promise<User> {
    const user = await this.getUserById(id);
    return await this.usersRepository.save({
      ...user,
      role: Role.ADMIN,
    });
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .getOne();
    if (!user) {
      throw new ApiException(ErrorMessages.USER_NOT_FOUND);
    }
    return user;
  }

  async findById(id: string): Promise<User> {
    return await this.usersRepository.findOne({ where: { id } });
  }

  async getUserByUserName(username: string): Promise<User> {
    return this.usersRepository
      .createQueryBuilder('user')
      .where('user.username = :username', { username })
      .getOne();
  }

  async existsUsername(username: string): Promise<boolean> {
    return await this.usersRepository.exist({ where: { username } });
  }

  async getPaginationUsers(pagination: Pagination) {
    const searchableFields: Array<keyof User> = [
      'jobTitle',
      'description',
      'email',
      'role',
      'homeTown',
      'address',
      'username',
      'phoneNumber',
    ];
    const queryBuilder = this.usersRepository
      .createQueryBuilder('user')
      .orderBy('user.createdAt', pagination.order)
      .take(pagination.take)
      .skip(pagination.skip)
      .where(
        searchableFields
          .map((field) => `user.${field} ILIKE :search`)
          .join(' OR '),
        {
          search: `%${pagination.search || ''}%`,
        },
      );

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const meta = new Meta({ itemCount, pagination });
    return new PaginationModel(entities, meta);
  }
}
