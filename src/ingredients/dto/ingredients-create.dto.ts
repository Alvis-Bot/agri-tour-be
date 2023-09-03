import {ApiProperty} from "@nestjs/swagger";
import {IsEnum, IsNotEmpty} from "class-validator";
import {SuppliesStatus} from "../../supplies/supplies";
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
    // @IsEnum(SuppliesStatus)
    @IsNotEmpty()
    status: IngredientsStatus;

    @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
    images: Express.Multer.File[];
}