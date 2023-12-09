import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { DiseasePayload, StatusDisease } from 'src/common/interface/care-schedule';

export class CreateCareScheduleDto {
    @ApiProperty({ example: 'ExampleLandId', description: 'Land ID' })
    landId: string;

    @ApiProperty({ example: 'ExampleCropId', description: 'Crop ID' })
    cropId: string;

    @ApiProperty()
    @ValidateNested()
    // @Transform(({ value }) => typeof value === 'string' ? [value] : value)
    detect: DiseasePayload;

    @ApiProperty()
    @ValidateNested()
    //@Transform(({ value }) => typeof value === 'string' ? [value] : value)
    status: StatusDisease;
}
