import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { ImagePath, Role, Router } from '../common/enum';
import { ApiTags } from '@nestjs/swagger';
import { AuthUser } from '../common/decorator/user.decorator';
import { User } from '../common/entities/user.entity';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { Note } from '../common/decorator/description.decorator';
import { Pagination } from 'src/common/pagination/pagination.dto';
import { UserService } from './user.service';
import { Roles } from 'src/common/decorator/role.decorator';
import {
  UserUpdateDto,
  UserUpdateProfileByManagerDto,
} from './dto/user-update.dto';
import { ApiFile } from 'src/common/decorator/file.decorator';
import { UUIDQuery } from '../common/decorator/uuid.decorator';
import { MulterUtils, UploadTypesEnum } from '../common/utils/multer.utils';
import { UserCreateDto } from './dto/user-create.dto';
import {Public} from "../common/meta/public.meta";

@Controller(Router.USER)
@ApiTags('User APIs  (user)')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('my')
  @Note('Lấy thông tin người dùng')
  async getAccount(@AuthUser() user: User) {
    return user;
  }

  @Public()
  @Get('')
  @Note('Lấy thông tin tất cả người dùng')
  async getAllUsers(@Query() pagination: Pagination) {
    return await this.userService.getPaginationUsers(pagination);
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard)
  @Note('Cấp quyền ADMIN cho tài khoản (admin)')
  @Post('admin')
  async assignAdminRole(@UUIDQuery('id') id: string): Promise<User> {
    return await this.userService.assignAdminRole(id);
  }

  @Note('Cập nhật thông tin người dùng (admin , user, associations, farmer)')
  @Roles(Role.ADMIN, Role.USER, Role.ASSOCIATIONS, Role.FARMER)
  @Put()
  @UseGuards(JwtAuthGuard)
  @ApiFile(
    'avatar',
    MulterUtils.getConfig(UploadTypesEnum.IMAGES, ImagePath.CARD_USER),
  )
  async updateProfile(
    @AuthUser() user: User,
    @Body() dto: UserUpdateDto,
    @UploadedFile() avatar?: Express.Multer.File,
  ): Promise<User> {
    return await this.userService.updateProfile(user, dto, avatar);
  }

  @Note('Tạo tài khoản người dùng (admin)')
  @Roles(Role.ADMIN)
  @Post()
  @ApiFile(
    'avatar',
    MulterUtils.getConfig(UploadTypesEnum.IMAGES, ImagePath.CARD_USER),
  )
  async createUser(
    @Body() dto: UserCreateDto,
    @UploadedFile() avatar?: Express.Multer.File,
  ): Promise<User> {
    return await this.userService.createProfileUser(dto, avatar);
  }

  @Roles(Role.ADMIN)
  @Note(
    'Cập nhật thông tin người dùng (admin) - muốn cập nhật field nào thì gửi field đó',
  )
  @Put('admin')
  async updateUserInfoByManager(
    @UUIDQuery('userId') userId: string,
    @Body() dto: UserUpdateProfileByManagerDto,
  ): Promise<User> {
    const myUser = await this.userService.getUserById(userId);
    return await this.userService.updateUserInfoByManager(myUser, dto);
  }

  @Roles(Role.ADMIN)
  @Note('Xóa tài khoản người dùng (admin)')
  @UseGuards(JwtAuthGuard)
  @Delete()
  async removeUser(@UUIDQuery('id') id: string) {
    return await this.userService.removeUser(id);
  }
}
