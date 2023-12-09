import {IsArray, IsNotEmpty, IsOptional, IsString, IsUUID} from 'class-validator';
import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';

export class CropUpdateDto {
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    name?: string;

    //loại bệnh thường gặp
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    disease: string;

    // đặc tính sinh trưởng
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    growth: string;

    // đặc tính sử dụng cây trồng
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    use: string;

    // thu hoạch
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    harvest: string;

    // giá bán giống cây trồng
    @ApiPropertyOptional()
    @IsOptional()
    price: number;

    @ApiPropertyOptional()
    @IsUUID()
    @IsOptional()
    groupCrop: string;

    // nhóm cây trồng

    // ảnh cây trồng
    // @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
    // images: Express.Multer.File[];
}


export class CropUpdateImageDto {
    // ảnh cây trồng
    @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
    images: Express.Multer.File[];
}

export class CropDeleteImageDto {
    // tên ảnh cây trồng cần xóa
    @ApiProperty({
        description: 'Tên ảnh cây trồng cần xóa',
    })
    @IsArray()
    @IsNotEmpty()
    removeImages: string[];
}