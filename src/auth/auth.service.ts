import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { User } from "../common/entities/user.entity";
import { UserService } from "../user/service/user.service";
import { ApiException } from "../exception/api.exception";
import { ErrorCode } from "../exception/error.code";
import { IAuthService } from "./auth";
import { Service } from "../common/enum/service";
import { IUserService } from "../user/service/user";
import { UpdateUserDto } from "src/common/dto/update-user.dto";
import { ConfigService } from "@nestjs/config";
import { TokenModel } from "./model/token.model";

export interface IJwtPayload {
  id: string;
  username: string;
}



@Injectable()
export class AuthService implements IAuthService {

  constructor(@Inject(Service.USER_SERVICE) private userService: IUserService,
    private readonly configService: ConfigService,
    private jwtService: JwtService) {
  }
  async login(user: User) {
    const model = await this.getTokens(user);
    return {
      user,
      ...model
    };
  }

  private async getTokens(user: User): Promise<TokenModel> {
    const payload: IJwtPayload = {
      username: user.username,
      id: user.id,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(
        payload,
        {
          secret: this.configService.get("JWT_REFRESH_TOKEN_SECRET"),
          expiresIn: 1000 * 60 * 60 * 24 * 7, // 7 days
        })
    ])
    return new TokenModel(accessToken, refreshToken)
  }

  private async getAccessToken(user: User): Promise<TokenModel> {
    const payload: IJwtPayload = {
      username: user.username,
      id: user.id,
    };
    const accessToken = await this.jwtService.signAsync(payload);
    return new TokenModel(accessToken)
  }

  // async generateAccessToken(user: User): Promise<string> {
  //   const payload: IJwtPayload = {
  //     id: user.id,
  //     username: user.username
  //   };
  //   const options = { expiresIn: '1h' }; // Customize the token expiration as per your needs
  //   return this.jwtService.signAsync(payload, options);
  // }

  // async generateRefreshToken(user: User): Promise<string> {
  //   const payload: IJwtPayload = {
  //     id: user.id,
  //     username: user.username
  //   };
  //   const refreshToken = await this.jwtService.signAsync(payload, {
  //     expiresIn: '7d',
  //   });
  //
  //   await this.userService.updateUserCustom(payload.id, {
  //     ...user,
  //     refreshToken,
  //   })
  //   return refreshToken;
  // }
  async validateJwt(payload: IJwtPayload): Promise<User> {
    return await this.userService.getUserById(payload.id);
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.getUserByUserName(username);
    if (!user) throw new ApiException(ErrorCode.USER_NOT_FOUND)
    const isMatch = await bcrypt.compare(pass, user.password);
    return isMatch ? user : null;
  }

   async refreshToken(myUser: User, refreshToken): Promise<any> {
      // 		// 3. tạo mới accessToken v
      // 		// 4. trả về accessToken
     return await this.getAccessToken(myUser);
  }

  async validateUserRefreshToken(id: string, refreshToken : string): Promise<void> {
    try {
      await this.jwtService.verifyAsync(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET')
      })
    } catch (e) {
      switch (e.name) {
        case 'TokenExpiredError':
          throw new ApiException(ErrorCode.REFRESH_TOKEN_EXPIRED)
        case 'JsonWebTokenError':
          throw new ApiException(ErrorCode.REFRESH_TOKEN_INVALID)
        default:
          throw new  UnauthorizedException()
      }
    }
  }
}
