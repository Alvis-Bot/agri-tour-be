import { ApiProperty, ApiQuery } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCategoryDto {

    @ApiProperty({
        example: 'Danh mục'
    })
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        example: 'Mô tả danh mục'
    })
    description: string;

}
