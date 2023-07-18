import { ApiProperty } from "@nestjs/swagger";
import { Point } from "typeorm";
import { Location as ILocation } from "../interface";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";
import { Type } from "class-transformer";


export class LandCreateDto {


  @ApiProperty({
    example: 'Land example',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'ádalsdddjajaja-1aksdkajsd-djakskdaksdl',
  })
  // @IsUUID()
  @IsNotEmpty()
  soilTypeId: string;

  @ApiProperty({
    example: [
      {
        point: 1,
        latitude: 2,
        longitude: 3
      },
      {
        point: 1,
        latitude: 11,
        longitude: 1
      },
    ]
  })

  @IsNotEmpty()
  locations: ILocation[];

  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
  images: string[];
}