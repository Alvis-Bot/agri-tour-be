import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsISO8601 } from 'class-validator';

export class DiseasePayload {
    @ApiProperty({
        example: 'Example Disease',
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        example: '2023-01-15',
    })
    @IsISO8601()
    @IsNotEmpty()
    startDate: string;

    @ApiProperty({
        example: '2023-01-30',
    })
    @IsISO8601()
    @IsNotEmpty()
    endDate: string;

    @ApiProperty({
        example: 'This is an example disease description.',
    })
    @IsString()
    @IsNotEmpty()
    description: string;
}

export class StatusDisease {
    @ApiProperty({
        example: 1,
    })
    @IsString()
    @IsNotEmpty()
    status: number;
    @ApiProperty({
        example: 'This is a note for the disease status',
    })
    @IsString()
    @IsNotEmpty()
    note: string;
}