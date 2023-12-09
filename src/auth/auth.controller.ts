import { Body, Controller, Post, Query, Req, UseGuards, Put } from "@nestjs/common";
import { Role, Router } from "../common/enum";
import { AuthService } from "./auth.service";
import { LoginDto } from "../common/dto/login.dto";
import { LocalAuthGuard } from "./guard/local-auth.guard";
import { ApiBody, ApiQuery, ApiTags } from "@nestjs/swagger";
import { UserCreateDto } from "../user/dto/user-create.dto";
import { AuthUser } from "../common/decorator/user.decorator";
import { User } from "../common/entities/user.entity";
import { Note } from "src/common/decorator/description.decorator";
import { RefreshTokenDto } from "./dto/refresh-token.dto";
import { TokenModel } from "./model/token.model";
import { RefreshAuthGuard } from "./guard/refresh-auth.guard";
import { UserService } from "../user/user.service";
import { RolesGuard } from "./guard/role.guard";
import { Roles } from "src/common/decorator/role.decorator";
import { JwtAuthGuard } from "./guard/jwt-auth.guard";
import { QueryIdDto } from "src/common/dto/query-id.dto";
import { UserUpdateDto } from "src/user/dto/user-update.dto";

@Controller(Router.AUTH)
@ApiTags("Auth APIs  (auth)")
export class AuthController {

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) { }


  @UseGuards(LocalAuthGuard)
  @Note("Đăng nhập")
  @ApiBody({
    type: LoginDto,
    examples: {
      ADMIN: {
        value: {
          username: 'admin',
          password: '123456',
        } as LoginDto,
      },
      FARMER: {
        value: {
          username: 'farmer',
          password: '123456',
        } as LoginDto,
      },
      USER: {
        value: {
          username: 'user',
          password: '123456',
        } as LoginDto,
      },
      ASSOCIATIONS: {
        value: {
          username: 'associations',
          password: '123456',
        } as LoginDto,
      }
    },
  })
  @Post('login')
  async login(@Body() dto: LoginDto, @AuthUser() user: User) {
    return this.authService.login(user);
  }


  @Post('register')
  @Note("Đăng ký")
  createUser(@Body() dto: UserCreateDto) {
    return this.userService.createProfileUser(dto);
  }

  @Post("refresh-tokens")
  @Note("Lấy lại token mới khi hết hạn")
  @UseGuards(RefreshAuthGuard)
  async refreshTokens(
    @AuthUser() myUser: User,
    @Body() dto: RefreshTokenDto,
  ): Promise<TokenModel> {
    return this.authService.refreshToken(myUser);

  }

}
