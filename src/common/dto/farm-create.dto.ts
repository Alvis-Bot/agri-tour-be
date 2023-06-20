import { ApiProperty } from "@nestjs/swagger";


export class FarmCreateDto{

    @ApiProperty()
    name: string;
}