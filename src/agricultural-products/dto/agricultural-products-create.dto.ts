import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty} from "class-validator";


export class AgriculturalProductsCreateDto{


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

    @ApiProperty({
        type: 'string',
        description: 'farm id'
    })
    @IsNotEmpty()
    farm: string;

    @ApiProperty()
    @IsNotEmpty()
    time: Date;

    @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
    images : string[];
}