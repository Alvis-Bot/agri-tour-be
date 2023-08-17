


import { IsInt, IsNumber, Min } from 'class-validator';


export class Location {
  @IsInt({ message: 'Point must be an integer' })
  point?: number;

  @IsNumber({}, { message: 'Latitude must be a number' })
  latitude: number;

  @IsNumber({}, { message: 'Longitude must be a number' })
  longitude: number;
}

export interface DynamicField {
  [key: string]: any;
}

