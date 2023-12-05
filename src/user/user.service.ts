import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { User } from '../common/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserCreateDto } from './dto/user-create.dto';
import { ApiException } from '../exception/api.exception';
import { Pagination } from '../common/pagination/pagination.dto';
import { PaginationModel } from '../common/pagination/pagination.model';
import { Meta } from '../common/pagination/meta.dto';
import { ErrorMessages } from '../exception/error.code';
import { ImagePath, Role } from 'src/common/enum';
import { UserUpdateDto } from './dto/user-update.dto';
import { CreateUserDTO } from './dto/create-profile-user.dto';
import { StorageService } from 'src/storage/storage.service';
import { UpdateUserDTO } from './dto/update-profile-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private storageService: StorageService,
  ) {}

  async deleteByAdmin(id: string): Promise<Object> {
    try {
      const user = await this.getUserById(id);
      await this.usersRepository.remove(user);
      return {
        message: 'User deleted successfully with id: ' + id,
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async createUser(dto: UserCreateDto): Promise<User> {
    if (await this.existsUsername(dto.username)) {
      throw new ApiException(ErrorMessages.USER_ALREADY_EXIST);
    }
    const userCreated = this.usersRepository.create(dto);
    return await this.usersRepository.save(userCreated);
  }

  async createProfileUser(dto: CreateUserDTO): Promise<User> {
    let avatar: string;
    if (await this.existsUsername(dto.username)) {
      throw new ApiException(ErrorMessages.USER_ALREADY_EXIST);
    }
    if (dto.avatar) {
      avatar = await this.storageService.uploadFile(
        ImagePath.CARD_USER,
        dto.avatar,
      );
    }
    const creating = this.usersRepository.create({
      ...dto,
      avatar: avatar ?? null,
    });
    return this.usersRepository.save(creating);
  }

  async updateUser(user: User, dto: UpdateUserDTO): Promise<User | any> {
    let avatar: string;
    try {
      if (dto.avatar && user.avatar !== null) {
        await this.storageService.deleteFile(user.avatar);
        avatar = await this.storageService.uploadFile(
          ImagePath.CARD_USER,
          dto.avatar,
        );
        user.avatar = avatar;
      }
      const merged = this.usersRepository.merge(user, {
        ...dto,
        avatar: avatar ?? user.avatar,
      });
      const saved = await this.usersRepository.save(merged);
      return saved;
    } catch (error) {
      await this.storageService.deleteFile(avatar);

      throw new ApiException(
        ErrorMessages.BAD_REQUEST,
        `Update User failed with error: ${error}`,
      );
    }
  }

  async updateByAdmin(id: string, dto: UserUpdateDto): Promise<User> {
    const user = await this.getUserById(id);
    if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, 10);
    }
    const merged = this.usersRepository.merge(user, {
      ...dto,
      password: dto.password,
    });
    await this.usersRepository.update(id, merged);
    return await this.getUserById(user.id);
  }

  async grantAccessAdmin(id: string): Promise<User> {
    try {
      const user = await this.getUserById(id);
      return await this.usersRepository.save({
        ...user,
        role: Role.ADMIN,
      });
    } catch (error) {
      throw new ApiException(
        ErrorMessages.BAD_REQUEST,
        'Error grant access admin',
      );
    }
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .getOne();
    if (!user) {
      throw new ApiException(ErrorMessages.USER_NOT_FOUND);
    } else if (user.isLocked) {
      throw new ForbiddenException('Account is locked');
    }
    return user;
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

  async getUsers(pagination: Pagination) {
    const queryBuilder = this.usersRepository
      .createQueryBuilder('user')
      .orderBy('user.createdAt', pagination.order)
      .take(pagination.take)
      .skip(pagination.skip)
      .where(
        `
        user.fullName ILIKE :search OR
        user.jobTitle ILIKE :search OR
        user.description ILIKE :search OR
        user.email ILIKE :search OR
        user.role ILIKE :search OR
        user.homeTown ILIKE :search OR
        user.address ILIKE :search OR
        user.username ILIKE :search OR
        user.phoneNumber ILIKE :search
        `,
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
