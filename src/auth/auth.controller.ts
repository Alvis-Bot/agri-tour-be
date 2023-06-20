import { Body, Controller, Get, Inject, Post, Query, UseGuards } from "@nestjs/common";
import { Router } from "../common/enum/router";
import { Service } from "../common/enum/service";
import { AuthService } from "./auth.service";
import { LoginDto } from "../common/dto/login.dto";
import { LocalAuthGuard } from "./guard/local-auth.guard";
import { ApiTags } from "@nestjs/swagger";
import { UserCreateDto } from "../common/dto/user-create.dto";
import { AuthUser } from "../common/decorator/user.decorator";
import { User } from "../common/entities/user.entity";
import { UserService } from "../user/service/user.service";
import { Permissions } from "../common/decorator/permissions.decorator";
import { Permission } from "../common/enum/permission";
import { JwtAuthGuard } from "./guard/jwt-auth.guard";
import { Pagination } from "../common/pagination/pagination.dto";
import { IUserService } from "../user/service/user";

@Controller(Router.AUTH)
@ApiTags("Auth APIs  (auth)")
export class AuthController {

  constructor( @Inject(Service.AUTH_SERVICE) private readonly authService: AuthService,
                @Inject(Service.USER_SERVICE) private readonly userService: IUserService) {}


  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() dto: LoginDto , @AuthUser() user : User) {
    return this.authService.login(user);
  }



  @Post('register')
  createUser(@Body() dto: UserCreateDto) {
    return this.userService.createUser(dto);
  }

  // @Permissions(Permission.UPDATE_USERS)
  @UseGuards(JwtAuthGuard)
  @Get('users')
  getUsers(@Query() pagination: Pagination) {
    return this.userService.getUsers(pagination);
  }

}
