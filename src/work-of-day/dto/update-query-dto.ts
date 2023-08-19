import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID } from "class-validator";

export class UpdateQueryWorkOfDayDTO {
    @IsUUID()
    @ApiProperty()
    id: string;

    @ApiProperty({
        required: false
    })
    landId: string;
    @ApiProperty({
        required: false
    })
    cropId: string;
}