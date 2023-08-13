import {User} from "../entities/user.entity";


export interface AuthenticationRequest extends Request {
  user: User;
}