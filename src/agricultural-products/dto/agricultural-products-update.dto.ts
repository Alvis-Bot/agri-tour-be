import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";
import {Transform} from "class-transformer";

export class AgriculturalProductsUpdateDto {
    @ApiProperty({
        required: false
    })
    @IsOptional()
    name?: string;


    @ApiPropertyOptional({
        type : Number
    })
    @IsOptional()
    money?: number;

    @ApiPropertyOptional()
    @IsOptional()
    quantity?: string;

    @ApiPropertyOptional()
    @IsOptional()
    weight?: string;

    @ApiPropertyOptional({ description: 'Farm ID' })
    @IsOptional()
    farmId?: string;

    @ApiPropertyOptional()
    @IsOptional()
    time?: Date;

    @ApiPropertyOptional({ type: 'array', items: { type: 'string', format: 'binary' } })
    @IsOptional()
    images?: string[];
}
