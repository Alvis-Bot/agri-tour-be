// create-work-of-day.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsDateString } from 'class-validator';

export class CreateWorkOfDayDto {
    @ApiProperty({
        format: 'date'
    })
    implement_at: string;

    @ApiProperty({
        example: '2 tiếng'
    })
    completed_at: string;

    @ApiProperty()
    @IsNotEmpty()
    job: string;

    @ApiProperty()
    description: string;


}
