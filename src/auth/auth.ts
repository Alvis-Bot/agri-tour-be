import { User } from "../common/entities/user.entity";
import { IJwtPayload } from "./auth.service";

export interface IAuthService{
    login(user : User): Promise<any>;
    validateJwt(payload: IJwtPayload): Promise<User>;
    validateUser(username: string, password: string): Promise<any>;

    refreshToken(id: User, refreshToken): Promise<any>;
    validateUserRefreshToken(id: string, refreshToken): Promise<void>;
}