import { ApiProperty } from "@nestjs/swagger";

export class CreateBusinessModelDto {
    @ApiProperty({
        example: 'Mô hình chăn nuôi'
    })
    name: string;
}
