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
    const payload: IJwtPayload = {
      id: user.id,
      username: user.username
    };
    return {
      user: user,
      accessToken: this.jwtService.sign(payload),
    }
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
