import { Injectable } from '@nestjs/common';
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

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async removeUser(id: string): Promise<{
    message: string;
    id: string;
  }> {
    // tìm user
    const user = await this.getUserById(id);
    // xóa avatar
    user.avatar && MulterUtils.deleteFile(user.avatar);
    // xóa user
    await this.usersRepository.delete(id);
    return {
      message: 'User deleted successfully',
      id,
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

    if (await this.existsPhoneNumber(dto.phoneNumber)) {
      throw new ApiException(ErrorMessages.PHONE_NUMBER_ALREADY_EXIST);
    }

    // taọ user
    const userCreated = this.usersRepository.create({
      ...dto,
      avatar: avatar ? MulterUtils.convertPathToUrl(avatar.path) : null,
    });
    // lưu user
    return await this.usersRepository.save(userCreated);
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
    // nếu có avatar thì xóa avatar cũ
    avatar && MulterUtils.deleteFile(user.avatar);

    // lưu dữ liệu mới
    return await this.usersRepository.save({
      ...user,
      ...dto,
      avatar: avatar ? MulterUtils.convertPathToUrl(avatar.path) : user.avatar,
    });
  }

  async updateUserInfoByManager(
    myUser: User,
    dto: UserUpdateProfileByManagerDto,
  ): Promise<User> {
    // lưu dữ liệu mới
    return await this.usersRepository.save({
      ...myUser,
      ...dto,
      password: dto.password ? await hash(dto.password, 10) : myUser.password,
      avatar: myUser.avatar,
    });
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
