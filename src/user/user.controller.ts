import { Body, Controller, Get, Inject, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { Router } from "../common/enum/router";
import { ApiTags } from "@nestjs/swagger";
import { CreateLocationDto } from "../common/dto/create-location.dto";
import { UserService } from "./service/user.service";
import { Point } from "typeorm";
import { Service } from "../common/enum/service";
import { IUserService } from "./service/user";
import { AuthUser } from "../common/decorator/user.decorator";
import { User } from "../common/entities/user.entity";
import { JwtAuthGuard } from "../auth/guard/jwt-auth.guard";
import { Note } from "../common/decorator/description.decorator";

@Controller(Router.USER)
@ApiTags("User APIs  (user)")
@UseGuards(JwtAuthGuard)
export class UserController {

  constructor(@Inject(Service.USER_SERVICE) private readonly userService: IUserService) {}

  @Get('my')
  @Note('Lấy thông tin người dùng')
  async getAccount(@AuthUser() user : User) {
    return user;
  }

}
