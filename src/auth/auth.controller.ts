import { Body, Controller, Get, Inject, Post, Query, Req, UseGuards } from "@nestjs/common";
import { Router } from "../common/enum/router";
import { Service } from "../common/enum/service";
import { AuthService, IJwtPayload } from "./auth.service";
import { LoginDto } from "../common/dto/login.dto";
import { LocalAuthGuard } from "./guard/local-auth.guard";
import { ApiConsumes, ApiTags } from "@nestjs/swagger";
import { UserCreateDto } from "../common/dto/user-create.dto";
import { AuthUser } from "../common/decorator/user.decorator";
import { User } from "../common/entities/user.entity";
import { Pagination } from "../common/pagination/pagination.dto";
import { IUserService } from "../user/service/user";
import { Note } from "src/common/decorator/description.decorator";
import { JwtAuthGuard } from "./guard/jwt-auth.guard";
import { AuthGuard } from "@nestjs/passport";
import { RefreshTokenDto } from "./dto/refresh-token.dto";
import { TokenModel } from "./model/token.model";
import { RefreshAuthGuard } from "./guard/refresh-auth.guard";

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

  // @UseGuards(JwtAuthGuard)
  // @Post('profile')
  // async profile(@Req() req) {
  //   return req.user;
  // }

  @Post('register')
  createUser(@Body() dto: UserCreateDto) {
    return this.userService.createUser(dto);
  }

  // @Note("Gia hạn mã token")
  // @Post('accessToken/get-time')
  // // @UseGuards(AuthGuard)
  // async accessToken(@Req() req) {
  //   const { user } = req;
  //
  //   // Generate a new token
  //   const accessToken = await this.authService.generateAccessToken(user);
  //   const refreshToken = await this.authService.generateRefreshToken(user);
  //   return {
  //     accessToken,
  //     refreshToken
  //   };
  // }

  @Post("refresh-tokens")
  @Note("Lấy lại token mới khi hết hạn")
  @UseGuards(RefreshAuthGuard)
  async refreshTokens(
    @AuthUser() myUser: User,
    @Body() dto: RefreshTokenDto,
  ): Promise<TokenModel> {
    return this.authService.refreshToken(myUser, dto.refreshToken);

  }
  
}
