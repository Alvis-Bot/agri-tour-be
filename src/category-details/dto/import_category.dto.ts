import { IsNotEmpty, IsString, IsUUID } from "class-validator";
import { ApiProperty, ApiQuery } from "@nestjs/swagger";
import { CategoryDetailsEnum } from "src/common/enum/cate_details";


export class ImportDataCategoryDto {
    @ApiProperty({ type: 'string', format: 'binary' })
    file: string;

    @IsNotEmpty()
    @ApiProperty()
    cateId?: string;
}


