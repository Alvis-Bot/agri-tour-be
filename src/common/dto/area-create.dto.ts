import { Location as ILocation } from "../abc";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";



export class AreaCreateDto {

  @ApiProperty({
    example: 'Name for area create'
  })
  @IsString()
  @IsNotEmpty()
  name: string;


  @ApiPropertyOptional({
    example: 'Description for area create'
  })
  @IsString()
  @IsOptional()
  description: string;


  @ApiProperty({
    example: 15
  })
  acreage: number;

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
  avatars: string[];
}