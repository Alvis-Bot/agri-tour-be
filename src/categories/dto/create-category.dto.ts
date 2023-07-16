import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCategoryDto {
    @ApiProperty({
        example: 'Tất cả danh mục'
    })
    @IsNotEmpty()
    name: string;

    // @IsOptional()
    // parentId?: number;
}
