import { ApiProperty } from "@nestjs/swagger";
import { Location } from "../interface";


export class FarmCreateDto{

    @ApiProperty()
    name: string;

    @ApiProperty({
        example:
            {
                point: 1,
                latitude: 1,
                longitude: 1
            },

    })
    location: Location
}