import { ApiProperty } from "@nestjs/swagger";


export class UploadLandDto {

  @ApiProperty({
    type: 'string',
    format: 'binary',
    isArray: true,
  })
  images?: Express.Multer.File[];
}