
import { IJwtPayload } from "../auth/auth.service";
import { User } from "./entities/user.entity";

import { IsInt, IsNumber, Min } from 'class-validator';

export interface AuthenticatedRequest extends Request {
  user?: User;
}

// export interface Location {
//   point?: number;
//   latitude: number;
//   longitude: number;
// }
// src/locations/entities/location.entity.ts


export class Location {
  @IsInt({ message: 'Point must be an integer' })
  point?: number;

  @IsNumber({}, { message: 'Latitude must be a number' })
  latitude: number;

  @IsNumber({}, { message: 'Longitude must be a number' })
  longitude: number;
}
