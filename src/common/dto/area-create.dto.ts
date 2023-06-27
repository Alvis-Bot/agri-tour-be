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
  locations: Location[];


  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({ type: "string", format: "binary" })
  file: Express.Multer.File;




}