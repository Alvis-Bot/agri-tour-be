import { Controller, Get, Inject , Query, UseGuards } from "@nestjs/common";
import { Router } from "../common/enum/router";
import { ApiTags } from "@nestjs/swagger";
import { AuthUser } from "../common/decorator/user.decorator";
import { User } from "../common/entities/user.entity";
import { JwtAuthGuard } from "../auth/guard/jwt-auth.guard";
import { Note } from "../common/decorator/description.decorator";
import { Pagination } from "src/common/pagination/pagination.dto";
import {UserService} from "./user.service";

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


}
