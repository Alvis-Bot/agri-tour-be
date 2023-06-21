import { ApiProperty } from "@nestjs/swagger";
import { Point } from "typeorm";
import { Location } from "../interface";


export class LandCreateDto{


  @ApiProperty()
  name: string;

  @ApiProperty({
    example: [
      {
        point: 1,
        latitude: 1,
        longitude: 1
      },
      {
        point: 2,
        latitude: 2,
        longitude: 2
      }
    ]
  })
  locations: Location[];

}