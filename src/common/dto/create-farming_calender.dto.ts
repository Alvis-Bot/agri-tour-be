import { ApiProperty } from "@nestjs/swagger";
import { CategoryDetails } from "src/category-details/entities/category-detail.entity";
import { Land } from "../entities/land.entity";
import { User } from "../entities/user.entity";

export class CreateFarmingCalenderDto {
    @ApiProperty({
        example: 'Tomato',
        description: 'The name of the product.',
    })

    product_name: string;

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
        example: 'Premium Quality Harvest',
        description: 'The expected output of the farming calendar.',
    })
    expectOutput: string;

    @ApiProperty({
        example: 'tons',
        description: 'The unit of measurement for the output.',
    })
    unit: string;


    categoryDetailId: string;


    land: string;


    user: string;
}
