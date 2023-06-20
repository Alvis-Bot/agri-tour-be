import { IJwtPayload } from "../auth/auth.service";
import { User } from "./entities/user.entity";


export interface AuthenticatedRequest extends Request {
  user?: User;
}

export interface Location {
  type: string;
  coordinates: number[];
}