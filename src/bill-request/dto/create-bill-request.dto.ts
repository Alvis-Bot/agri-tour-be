import { ApiProperty } from "@nestjs/swagger";

export class CreateBillRequestDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    quantity: number;

    @ApiProperty()
    description: string;

    @ApiProperty({
        type: 'integer',
        minimum: 1,
        maximum: 4
    })
    status: number;
    @ApiProperty()
    materialId: string; // This will hold the ID of the related Material

    @ApiProperty()
    providerId: string; // This will hold the ID of the related PersonEntity
}
