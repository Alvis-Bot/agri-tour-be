import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID } from "class-validator";

export class QueryWorkOfDayDTO {

    @ApiProperty()
    @IsUUID()
    @IsNotEmpty()
    landId: string;
    @ApiProperty()
    @IsUUID()
    @IsNotEmpty()
    cropId: string;
}