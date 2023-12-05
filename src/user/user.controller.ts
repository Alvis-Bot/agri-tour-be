import {Body, Controller, Get, Post, Put, Query, UseGuards, UploadedFile, Delete} from "@nestjs/common";
import { FileTypes, Role, Router } from "../common/enum";
import { ApiQuery, ApiTags } from "@nestjs/swagger";
import { AuthUser } from "../common/decorator/user.decorator";
import { User } from "../common/entities/user.entity";
import { JwtAuthGuard } from "../auth/guard/jwt-auth.guard";
import { Note } from "../common/decorator/description.decorator";
import { Pagination } from "src/common/pagination/pagination.dto";
import { UserService } from "./user.service";
import { Roles } from "src/common/decorator/role.decorator";
import { QueryIdDto } from "src/common/dto/query-id.dto";
import { UserUpdateDto } from "./dto/user-update.dto";
import { UserCreateDto } from "./dto/user-create.dto";
import { CreateUserDTO } from "./dto/create-profile-user.dto";
import { ApiFile } from "src/common/decorator/file.decorator";
import { UpdateUserDTO } from "./dto/update-profile-user.dto";
import { RoleDTO } from "src/common/enum/role.enum";
import { UserRelation } from "./dto/Relation.dto";
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

  @Get('gets')
  @Note('Lấy thông tin tất cả người dùng')
  async getAllUsers(
    @Query() pagination: Pagination,
  ) {
    return await this.userService.getUsers(pagination);
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard)
  @Post('grantAccessAdmin')
  async grantAccessAdmin(@Query() { id }: QueryIdDto): Promise<any> {
    return await this.userService.grantAccessAdmin(id);
  }

  ////////////////////////////////////////////////////////////////
  @Roles(Role.ADMIN, Role.USER, Role.ASSOCIATIONS, Role.FARMER)
  @UseGuards(JwtAuthGuard)
  @Put('updateUser')
  @ApiFile('avatar', FileTypes.IMAGE)
  async updateUser(
    @AuthUser() user: User,
    @Body() dto: UpdateUserDTO,
    @UploadedFile() avatar?: Express.Multer.File,
  ): Promise<User | any> {
    return await this.userService.updateUser(user, {
      ...dto,
      avatar,
    });
  }

  @Roles(Role.ADMIN)
  @Post('createUser')
  @ApiFile('avatar', FileTypes.IMAGE)
  async createUser(
    @Body() dto: CreateUserDTO,
    @UploadedFile() avatar: Express.Multer.File,
  ): Promise<User> {
    return await this.userService.createProfileUser({
      ...dto,
      avatar,
    });
  }

  ////////////////////update by admin////////////////////////////////////////////
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard)
  @Put('updateUserByAdmin')
  async updateUserByAdmin(
    @Query() { id }: QueryIdDto,
    @Query() { role }: RoleDTO,
    @Body() dto: UserUpdateDto,
  ): Promise<User | any> {
    return await this.userService.updateByAdmin(id, {
      ...dto,
      role
    });
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard)
  @Delete('delete')
  async deleteUserByAdmin(@Query() { id }: QueryIdDto): Promise<Object> {
    return await this.userService.deleteByAdmin(id);
  }
}
