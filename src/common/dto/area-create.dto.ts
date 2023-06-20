import { Location } from "../interface";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Point } from "typeorm";


export class AreaCreateDto {

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: [
      {
        type: 'Point',
        coordinates: [1, 1],
      },
      {
        type: 'Point',
        coordinates: [2, 2],
      }
    ]
  })
  locations: Point[];


  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description: string;



}