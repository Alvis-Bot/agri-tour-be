import { ApiProperty } from "@nestjs/swagger";
import { Location as ILocation } from "../abc";
import { User } from "../entities/user.entity";
import { Transform } from "class-transformer";


export class FarmCreateDto {

    user: User;

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
    @Transform(({ value }) => typeof value === 'string' ? JSON.parse(value) : value)
    location: ILocation;

    @ApiProperty({ required: false, example: 'example value' })
    region: string;

    @ApiProperty({ required: false, example: 'example value' })
    phoneNumber: string;

    @ApiProperty({ required: false, example: 'example value' })
    user_representative: string;

    @ApiProperty({ required: false, example: 'example value' })
    email: string;

    @ApiProperty({ type: 'string', format: 'binary' })
    image: string;

}