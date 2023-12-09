import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {IsEnum, IsNotEmpty, IsOptional} from "class-validator";
import {IngredientsStatus} from "../ingredients";


export class IngredientsCreateDto{


    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    money: number;

    @ApiProperty()
    @IsNotEmpty()
    quantity: string;

    @ApiProperty()
    @IsNotEmpty()
    weight: string;

    @ApiProperty()
    @IsNotEmpty()
    information: string;

    @ApiProperty({
        example : new Date()
    })
    @IsNotEmpty()
    time: Date;

    @ApiProperty({
        enum : IngredientsStatus,
        default : IngredientsStatus.INVENTORY,
    })
    @IsNotEmpty()
    status: IngredientsStatus;

    @ApiPropertyOptional({ type: 'array', items: { type: 'string', format: 'binary' } })
    @IsOptional()
    images?: Express.Multer.File[];
}