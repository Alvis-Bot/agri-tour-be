import { ApiProperty } from "@nestjs/swagger";
import { User } from "../entities/user.entity";


export class CreateFarmingCalenderDto {
    @ApiProperty({
        example: 'Tomato',
        description: 'The name of the product.',
    })
    product_name: string;
    @ApiProperty({
        nullable: false
    })
    productTypeId: string;
    @ApiProperty({
        example: 5,
        description: 'The number of varieties of the product.',
    })
    numberOfVarites: number;

    @ApiProperty({
        example: '2023-07-01',
        description: 'The start day of the farming calendar.',
    })
    startDay: Date;

    @ApiProperty({
        example: '2023-10-15',
        description: 'The end date of the farming calendar.',
    })
    endDate: Date;

    @ApiProperty({
        example: 'Seeds Inc.',
        description: 'The seed provider for the farming calendar.',
    })
    seedProvider: string;

    @ApiProperty({
        example: 1000
    })
    expectOutput: number;

    @ApiProperty({
        example: 'Tấn',
        description: 'The unit of measurement for the output.',
    })
    unit: string;


    @ApiProperty({
        example: [
            "1a0b9b4d-2baa-41c3-a80c-30fa7a4abb9a",
            "9434b220-b8c8-4942-a0a7-d8f18cb64b23",
            "efb2a120-bc53-4a99-a9c0-fedc046c3f71",
        ]
    })
    users: string[];

}
