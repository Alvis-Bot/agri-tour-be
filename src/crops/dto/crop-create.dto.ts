import {IsNotEmpty, IsString, IsUUID} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CropCreateDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  //loại bệnh thường gặp
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  disease: string;

  // đặc tính sinh trưởng
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  growth: string;

  // đặc tính sử dụng cây trồng
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  use: string;

  // thu hoạch
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  harvest: string;

  // giá bán giống cây trồng
  @ApiProperty()
  @IsNotEmpty()
  price: number;

  @ApiProperty()
  @IsUUID()
    @IsNotEmpty()
  groupCrop: string;

  // nhóm cây trồng

  // ảnh cây trồng
  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
  images: Express.Multer.File[];
}