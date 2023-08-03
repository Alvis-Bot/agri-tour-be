import { ApiProperty, ApiQuery } from "@nestjs/swagger";
import { Point } from "typeorm";
import { Location as ILocation } from "../interface";
import { IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";
import { Type } from "class-transformer";
import { CategoryDetails } from "src/category-details/entities/category-detail.entity";


export class LandCreateDto {


  @ApiProperty({
    example: 'Land example',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  productTypeId: string;


  @ApiProperty({
    example: 14.3322,
  })
  acreage: number;
  @ApiProperty({
    example: 'ádalsdddjajaja-1aksdkajsd-djakskdaksdl',
  })
  @ApiProperty()
  @IsNotEmpty()
  soilTypeId: string;

  @ApiProperty({
    type: 'array',
    items: {
      type: 'object',
      properties: {
        point: { type: 'number', example: 12 },
        latitude: { type: 'number', example: 24.5 },
        longitude: { type: 'number', example: 14.5 },
      },
    },
  })

  @IsNotEmpty()
  locations: ILocation[];

  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
  images: string[];
}