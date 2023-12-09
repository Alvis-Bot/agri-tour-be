import { ApiProperty } from "@nestjs/swagger";
import {IsNotEmpty, IsString} from "class-validator";

export class TypeCreateDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;
}
