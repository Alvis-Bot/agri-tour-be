import { Inject, Injectable } from "@nestjs/common";
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

export interface IJwtPayload {
  id: string;
  username: string;
}



@Injectable()
export class AuthService implements IAuthService {

  constructor(@Inject(Service.USER_SERVICE) private userService: IUserService,
    private jwtService: JwtService) {
  }
  async login(user: User) {
    const accessToken = await this.generateAccessToken(user);
    const refreshToken = await this.generateRefreshToken(user);

    const { refreshToken: userRefreshToken, ...userWithoutRefreshToken } = user;

    return {
      user: userWithoutRefreshToken,
      accessToken,
      refreshToken
    };
  }

  async generateAccessToken(user: User): Promise<string> {
    const payload: IJwtPayload = {
      id: user.id,
      username: user.username
    };
    const options = { expiresIn: '1h' }; // Customize the token expiration as per your needs
    return this.jwtService.signAsync(payload, options);
  }

  async generateRefreshToken(user: User): Promise<string> {
    const payload: IJwtPayload = {
      id: user.id,
      username: user.username
    };
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '1y',
    });

    await this.userService.updateUserCustom(payload.id, {
      ...user,
      refreshToken,
    })
    return refreshToken;
  }
  async validateJwt(payload: IJwtPayload): Promise<User> {
    return await this.userService.getUserById(payload.id);
  }

  async validateUser(username: string, pass: string): Promise<any> {
    console.log("LocalStrategy.validate");
    const user = await this.userService.getUserByUserName(username);
    if (!user) throw new ApiException(ErrorCode.USER_NOT_FOUND)
    const isMatch = await bcrypt.compare(pass, user.password);
    if (user && isMatch) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
