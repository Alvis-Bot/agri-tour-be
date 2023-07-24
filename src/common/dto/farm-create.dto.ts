import { ApiProperty } from "@nestjs/swagger";
import { Location as ILocation } from "../interface";
import { User } from "../entities/user.entity";


export class FarmCreateDto {

    @ApiProperty({
        example: 'Trang trại vinamilk'
    })
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
            latitude: 123.333,
            longitude: 144.444
        },
    })
    location: ILocation
    @ApiProperty({ type: 'string', format: 'binary' })
    image: string;
    user:User;
}