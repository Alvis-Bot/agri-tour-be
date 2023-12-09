import { IsInt, IsBoolean, IsString, IS_ISO8601, IsISO8601 } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateHarvestDto {
    @ApiProperty({ example: 'c3b068e5-2303-4d25-aa92-4222ce15e6cb', description: 'ID of the associated Land' })
    @IsString()
    landId: string;

    @ApiProperty({ example: '5ea193f3-97b2-4fc4-80d8-74ce86b22750', description: 'ID of the associated Crop' })
    @IsString()
    cropId: string;

    @ApiProperty({
        example: '2023-08-11'
    })
    @IsISO8601()
    start_date: string;
    @ApiProperty({
        example: '2023-08-11'
    })
    @IsISO8601()
    end_date: string;
    @ApiProperty({ example: 50, description: 'Quantity of the harvest' })
    @IsInt({ message: 'Quantity should be an integer' })
    quantity: number;

    @ApiProperty({ example: true, description: 'Status of the harvest' })
    @IsBoolean()
    status: boolean;

    @ApiProperty({ example: 'd9e1f042-5927-4f0b-8a0d-287dd0b2eefe', description: 'ID of the associated User' })
    @IsString()
    userId: string;

    @ApiProperty({ example: 'This is a note for the harvest', description: 'Additional note for the harvest', required: false })
    @IsString()
    note: string;
}
