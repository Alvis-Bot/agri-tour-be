import { Controller, Get, Inject, Query, Res } from "@nestjs/common";
import { Router } from "../common/enum/router";
import { IImageService } from "./service/image";
import { Service } from "../common/enum/service";
import { Note } from "../common/decorator/description.decorator";
import { ApiTags } from "@nestjs/swagger";

@Controller(Router.IMAGE)
@ApiTags('Image APIs')
export class ImageController {

  constructor (@Inject(Service.IMAGE_SERVICE) private readonly imageService: IImageService) {}

  // @Get()
  // @Note("Lấy ảnh theo tên ảnh")
  // async getImgById(@Res() response ,@Query('name') name: string){
  //   response.sendFile(name, { root: 'uploads' });
  // }

}
