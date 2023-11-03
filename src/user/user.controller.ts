import { Body, Controller, Get , Post, Put, Query, UseGuards } from "@nestjs/common";
import { Role, Router } from "../common/enum";
import { ApiQuery, ApiTags } from "@nestjs/swagger";
import { AuthUser } from "../common/decorator/user.decorator";
import { User } from "../common/entities/user.entity";
import { JwtAuthGuard } from "../auth/guard/jwt-auth.guard";
import { Note } from "../common/decorator/description.decorator";
import { Pagination } from "src/common/pagination/pagination.dto";
import {UserService} from "./user.service";
import { Roles } from "src/common/decorator/role.decorator";
import { QueryIdDto } from "src/common/dto/query-id.dto";
import { UserUpdateDto } from "./dto/user-update.dto";
@Controller(Router.USER)
@ApiTags("User APIs  (user)")
@UseGuards(JwtAuthGuard)
export class UserController {

  constructor(private readonly userService: UserService) { }

  @Get('my')
  @Note('Lấy thông tin người dùng')
  async getAccount(@AuthUser() user: User) {
    return user;
  }

  @Get('gets')
  @Note('Lấy thông tin tất cả người dùng')
  async getAllUsers(@Query() pagination: Pagination) {
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
  @ApiQuery({
    enum: Role,
    name: 'role'
  })
  async updateUser(@AuthUser() user: User, @Query('role') role: Role, @Body() dto: UserUpdateDto): Promise<User | any> {
    return await this.userService.updateUser(user.id, {
      ...dto,
      role
    });
  }
  ////////////////////update by admin////////////////////////////////////////////
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard)
  @Put('updateUserByAdmin')
  @ApiQuery({
    enum: Role,
    name: 'role'
  })
  async updateUserByAdmin(@Query() { id }: QueryIdDto, @Query('role') role: Role, @Body() dto: UserUpdateDto): Promise<User | any> {

    return await this.userService.updateUser(id, {
      ...dto,
      role
    });
  }

}
