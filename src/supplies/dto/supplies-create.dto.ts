import {IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {SuppliesStatus} from "../supplies";
import {Transform} from "class-transformer";


export class SuppliesCreateDto{

    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    money: number;

    @ApiProperty()
    @IsNotEmpty()
    quantity: number;

    @ApiProperty({
       example : new Date()
    })
    time: Date;


    @ApiProperty({
        enum : SuppliesStatus,
        default : SuppliesStatus.INVENTORY,
        description : ' 0 : Còn hàng , 1 : Hết hàng'
    })
    // @IsEnum(SuppliesStatus)
    @IsNotEmpty()
    status: SuppliesStatus;

    @ApiPropertyOptional()
    @IsOptional()
    note?: string;


    @ApiProperty({ type: 'string', format: 'binary' , isArray: true })
    images:Express.Multer.File[];
}