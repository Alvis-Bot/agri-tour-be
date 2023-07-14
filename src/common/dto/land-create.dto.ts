import { ApiProperty } from "@nestjs/swagger";
import { Point } from "typeorm";
import { Location } from "../interface";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";
import { Type } from "class-transformer";


export class LandCreateDto {


  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;


  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  soilTypeId: string;

  @ApiProperty({
    example: [
      {
        point: 1,
        latitude: 1,
        longitude: 1
      },
      {
        point: 2,
        latitude: 2,
        longitude: 2
      }
    ]
  })
  @IsNotEmpty()
  locations: Location[];

  images: string[];
}