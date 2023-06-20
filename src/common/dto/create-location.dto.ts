import { ApiProperty } from "@nestjs/swagger";
import { Point } from 'geojson';
import { MultiPoint } from "typeorm";
export class CreateLocationDto{

  @ApiProperty()
    name: string;


  @ApiProperty({
    title: 'current_location',
    example: {
      type: 'MultiPoint',
      coordinates: [
        [100.0, 0.0],
        [101.0, 1.0],
      ],
    }
  })
  location: MultiPoint;

}