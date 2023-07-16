import { ApiProperty } from "@nestjs/swagger";

export class CreateBusinessTypeDto {
    @ApiProperty({
        example: 'Loại hình kinh doanh 1'
    })
    name: string;
}
