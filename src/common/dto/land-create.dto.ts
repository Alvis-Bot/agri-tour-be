import { ApiProperty } from "@nestjs/swagger";
import { Point } from "typeorm";


export class LandCreateDto{


  @ApiProperty()
  name: string;

  @ApiProperty({
    example: [
      {
        type: 'Point',
        coordinates: [1, 1],
      },
      {
        type: 'Point',
        coordinates: [2, 2],
      }
    ]
  })
  locations: Point[];

}