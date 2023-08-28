import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsInt, IsNotEmpty } from "class-validator";

export class CreateVisitorDto {
    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsInt()
    quantity: number;

    @ApiProperty()
    @IsDateString()
    receptionDay: Date;

    @ApiProperty()
    description: string;

    @ApiProperty({
        maximum: 4,
        minimum: 1,
        type: 'integer'
    })
    status: number;
}
