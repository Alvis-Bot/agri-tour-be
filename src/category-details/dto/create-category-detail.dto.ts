import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateCategoryDetailDto {
    @ApiProperty({ example: 'Category Detail Name' })
    name: string;

    @ApiProperty({ example: 'Category Detail Description' })
    description: string;

    @ApiPropertyOptional({
        required: false,
        example: 'Id category details'
    })
    parentId: string;

    cateId: string;
}
