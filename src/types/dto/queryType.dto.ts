import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class QueryTypeDTO {
    @ApiProperty()
    @IsNotEmpty()
    type: string;
}