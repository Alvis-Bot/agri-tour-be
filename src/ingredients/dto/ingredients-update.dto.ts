import { ApiPropertyOptional} from "@nestjs/swagger";
import { IsOptional} from "class-validator";
import {IngredientsStatus} from "../ingredients";


export class IngredientsUpdateDto{


    @ApiPropertyOptional()
    @IsOptional()
    name: string;


    @ApiPropertyOptional()
    @IsOptional()
    money: number;


    @ApiPropertyOptional()
    @IsOptional()
    quantity: string;


    @ApiPropertyOptional()
    @IsOptional()
    weight: string;


    @ApiPropertyOptional()
    @IsOptional()
    information: string;


    @ApiPropertyOptional({
        example : new Date()
    })
    @IsOptional()
    time: Date;

    @ApiPropertyOptional({
        enum : IngredientsStatus,
        default : IngredientsStatus.INVENTORY,
    })
    @IsOptional()
    status: IngredientsStatus;

    @ApiPropertyOptional({ type: 'array', items: { type: 'string', format: 'binary' } })
    @IsOptional()
    images?: Express.Multer.File[];
}