import {ApiProperty} from "@nestjs/swagger";
import {Transform} from "class-transformer";
import {IsArray} from "class-validator";


export class UploadLandDto {


    @ApiProperty({
        type: 'string',
        isArray: true,
    })
    @IsArray()
    // nếu là value là string biến nó thành mảng string
    @Transform(({value}) => typeof value === 'string' ? [value] : value)
    // tên name củ
    fileNames: string[];

    @ApiProperty({
        type: 'string',
        format: 'binary',
        isArray: true,
    })
    images?: Express.Multer.File[];
}