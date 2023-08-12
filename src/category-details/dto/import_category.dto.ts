import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class ImportDataCategoryDto {
    @ApiProperty({ type: 'string', format: 'binary' })
    file: string;

    @IsNotEmpty()
    @ApiProperty()
    cateId?: string;
}


