import { ApiProperty } from '@nestjs/swagger';
import { Location as ILocation } from '../abc';
import { IsNotEmpty, IsString } from 'class-validator';

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
  @IsNotEmpty()
  soilTypeId: string;

  // @IsNotEmpty()
  // @ApiProperty({
  //   example: '[{"latitude": 14.3322, "longitude": 14.3322 , "point": 1}]',
  //   isArray: false,
  // })
  // @Transform(({ value }) => JSON.parse(value))
  // locations: ILocation[];
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
  images: Express.Multer.File[];
}