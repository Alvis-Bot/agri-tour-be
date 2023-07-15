import { ApiProperty } from "@nestjs/swagger";
import { Location } from "../interface";


export class FarmCreateDto {

    @ApiProperty()
    name: string;
    @ApiProperty({ example: 'Business Model' })
    business_model: string;

    @ApiProperty({ example: 'Business Type' })
    business_type: string;

    @ApiProperty({ example: 'Province' })
    province: string;

    @ApiProperty({ example: 'District' })
    district: string;

    @ApiProperty({ example: 'Wards' })
    wards: string;
    @ApiProperty({ example: 'Address Example' })
    address: string;

    @ApiProperty({
        example:
        {
            point: 1,
            latitude: 1,
            longitude: 1
        },

    })
    location: Location
    @ApiProperty({ type: 'string', format: 'binary' })
    image: string;
}