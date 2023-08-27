import { ApiProperty } from '@nestjs/swagger';

export class CreateMaterialDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    quantity: number;

    @ApiProperty()
    description: string;

    @ApiProperty({ type: 'string', format: 'binary', isArray: true })
    images: Express.Multer.File[];

    @ApiProperty()
    materialGroupId?: string;

}