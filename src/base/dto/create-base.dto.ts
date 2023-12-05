import { ApiProperty } from "@nestjs/swagger";

export class CreateBaseDto {
    @ApiProperty({
        example: 'example name'
    })
    name: string;

    @ApiProperty({
        required: false,
        example: 'example description'
    })
    description: string;
}
