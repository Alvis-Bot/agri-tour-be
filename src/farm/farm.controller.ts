import { BadRequestException, Body, Controller, Get, Inject, Post, Query, Req, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { Router } from "../common/enum/router";
import { Service } from "../common/enum/service";
import { IFarmService } from "./service/farm";
import { Description } from "../common/decorator/description.decorator";
import { FarmCreateDto } from "../common/dto/farm-create.dto";

import { AuthUser } from "../common/decorator/user.decorator";
import { User } from "../common/entities/user.entity";
import { ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { Public } from "../auth/public.meta";
import { QueryAllDto } from "./dto/query-all.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import * as path from "path";
import * as fs from "fs";
import { Farm } from "src/common/entities/farm.entity";
import { AuthGuard } from "src/auth/guard/Auth.guard";
@Controller(Router.FARM)
// @UseGuards(JwtAuthGuard)

@ApiTags('Farm APIs')
export class FarmController {
  constructor(@Inject(Service.FARM_SERVICE) private readonly farmService: IFarmService) {
  }

  @Post('concac')
  @UseGuards(AuthGuard)
  async Concac(@Req() req) {
    return req.user;
  }
  @Post('create-farm')
  @Description("Tạo mới một trang trại")
  @ApiConsumes('multipart/form-data', 'application/json')
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: 'public/uploads/farms',
      filename: (req, file, callback) => {

        let name = `${Date.now()}-unknown`;
        if (file.originalname && typeof file.originalname === 'string') {
          name = `${Date.now()}-${path.parse(file.originalname).name}`;
        }
        const extension = path.parse(file.originalname || '').ext;
        const filePath = path.join(`public/uploads/farms`, `${name}${extension}`);
        if (fs.existsSync(filePath)) {
          console.log("file already exists! deleting...")
          fs.unlinkSync(filePath);
          console.log("Deleted!");
        }

        console.log("Uploading...");
        callback(null, `${name}${extension}`);

      },
    }),
  }))

  @UseGuards(AuthGuard)
  async createFarm(@UploadedFile() file: Express.Multer.File, @Body() createfarmDto: FarmCreateDto, @Req() req): Promise<Farm | any> {

    const filePath = `uploads/farms/${file.filename}`;
    if (!filePath) {
      throw new BadRequestException('File is required');
    }

     return this.farmService.createFarm({
      ...createfarmDto,
      image: filePath,
      userId:req.user.id
     });
   // fs.unlinkSync(`public/${filePath}`)
  }

  @Get()
  @Description("Lấy thông tin trang trại theo id")
  async getFarmById(@Query('id') id: string) {
    return this.farmService.getFarmById(id);
  }


  @Get('area-land')
  @Description("Lấy toàn bộ thông tin nông trại")
  async getFarmFetchLandAndArea(@Query() dto: QueryAllDto) {
    return this.farmService.getFarmFetchLandAndArea(dto)
  }


  @Get('all')
  @Description("Lấy danh sách trang trại")
  async getFarms() {
    return this.farmService.getFarms();
  }


}
