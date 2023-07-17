import { Body, Controller, Get, Inject, Post, Query, Req, UseGuards } from "@nestjs/common";
import { Router } from "../common/enum/router";
import { Service } from "../common/enum/service";
import { AuthService } from "./auth.service";
import { LoginDto } from "../common/dto/login.dto";
import { LocalAuthGuard } from "./guard/local-auth.guard";
import { ApiConsumes, ApiTags } from "@nestjs/swagger";
import { UserCreateDto } from "../common/dto/user-create.dto";
import { AuthUser } from "../common/decorator/user.decorator";
import { User } from "../common/entities/user.entity";
import { Pagination } from "../common/pagination/pagination.dto";
import { IUserService } from "../user/service/user";
import { AuthGuard } from "./guard/Auth.guard";
import { Description } from "src/common/decorator/description.decorator";

@Controller(Router.AUTH)
@ApiTags("Auth APIs  (auth)")
export class AuthController {

  constructor(
    @Inject(Service.AUTH_SERVICE) private readonly authService: AuthService,
    @Inject(Service.USER_SERVICE) private readonly userService: IUserService
  ) { }


  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() dto: LoginDto, @AuthUser() user: User) {
    return this.authService.login(user);
  }

  @UseGuards(AuthGuard)
  @Post('profile')
  async profile(@Req() req) {
    return req.user;
  }

  @Post('register')
  createUser(@Body() dto: UserCreateDto) {
    return this.userService.createUser(dto);
  }

  // @Permissions(Permission.UPDATE_USERS)

  @Get('users')
  getUsers(@Query() pagination: Pagination) {
    return this.userService.getUsers(pagination);
  }
  @Description("Gia hạn mã token")
  @Post('accessToken/get-time')
  @UseGuards(AuthGuard)
  async accessToken(@Req() req) {
    const { user } = req;

    // Generate a new token
    const accessToken = await this.authService.generateAccessToken(user);
    const refreshToken = await this.authService.generateRefreshToken(user);
    return {
      accessToken,
      refreshToken
    };
  }
  
}
