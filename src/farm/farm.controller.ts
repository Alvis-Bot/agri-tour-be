import { BadRequestException, Body, Controller, Get, Inject, Post, Query, Req, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { Router } from "../common/enum/router";
import { Service } from "../common/enum/service";
import { IFarmService } from "./service/farm";
import { Note } from "../common/decorator/description.decorator";
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
import { ApiException } from "src/exception/api.exception";
import { ErrorCode } from "src/exception/error.code";
@Controller(Router.FARM)
// @UseGuards(JwtAuthGuard)

@ApiTags('Farm APIs')
export class FarmController {
  constructor(@Inject(Service.FARM_SERVICE) private readonly farmService: IFarmService) {
  }

  @Post('create-farm')
  @Note("Tạo mới một trang trại")
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: 'public/uploads/farms',
      filename: (req, file, callback) => {

        let name = `${Date.now()}-unknown`;
        if (file.originalname && typeof file.originalname === 'string') {
          name = `${Date.now()}-${path.parse(file.originalname).name}`;
        }
        const extension = path.parse(file.originalname || '').ext;


        console.log("Uploading...");
        callback(null, `${name}${extension}`);
        console.log("Uploading...", file);
      },

    }),
    fileFilter: (req: any, file: any, cb: any) => {

      if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
        // Allow storage of file
        cb(null, true);
      } else {
        // Reject file
        cb(new ApiException(ErrorCode.FILE_TYPE_NOT_MATCHING), false);
      }
    },
  }))

  @UseGuards(AuthGuard)
  async createFarm(@UploadedFile() image: Express.Multer.File, @Body() createfarmDto: FarmCreateDto, @Req() req): Promise<Farm | any> {
    try {

      const filePath = `uploads/farms/${image?.filename}`;
      if (!filePath) {
        throw new BadRequestException('File is required');
      }
      console.log(filePath);

      return await this.farmService.createFarm({
        ...createfarmDto,
        image: filePath,
        userId: req.user.id
      });

    } catch (error) {
      throw new BadRequestException({
        message: [error.message]
      });
    }
  }

  @Get()
  @Note("Lấy thông tin trang trại theo id")
  async getFarmById(@Query('id') id: string) {
    return this.farmService.getFarmById(id);
  }


  @Get('area-land')
  @Note("Lấy toàn bộ thông tin nông trại")
  async getFarmFetchLandAndArea(@Query() dto: QueryAllDto) {
    return this.farmService.getFarmFetchLandAndArea(dto)
  }


  @Get('all')
  @Note("Lấy danh sách trang trại")
  async getFarms() {
    return this.farmService.getFarms();
  }


}
