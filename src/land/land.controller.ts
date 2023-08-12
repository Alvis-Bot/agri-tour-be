import { BadRequestException, Body, Controller, Get, Inject, Logger, Patch, Post, Query, Req, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { Router } from "../common/enum/router";
import { Service } from "../common/enum/service";
import { LandCreateDto } from "../common/dto/land-create.dto";
import { Land } from "../common/entities/land.entity";
import { ApiConsumes, ApiTags } from "@nestjs/swagger";

import { Note } from "../common/decorator/description.decorator";
import { IAreaService } from "../area/service/area";
import { QueryAreaIdDto } from "../common/dto/query-area-id.dto";
import { QueryIdDto } from "../common/dto/query-id.dto";
import { diskStorage } from "multer";
import * as path from 'path';
import { ApiException } from "../exception/api.exception";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import {ErrorMessages} from "../exception/error.code";
import {LandService} from "./land.service";
@Controller(Router.LAND)
@ApiTags('Land APIs')
export class LandController {
  constructor(private readonly landService: LandService,
    @Inject(Service.AREA_SERVICE) private readonly areaService: IAreaService) {
  }

  @Post('create')
  @ApiConsumes('multipart/form-data', 'application/json')
  @Note("Tạo mới vùng canh tác")


  @UseInterceptors(FileFieldsInterceptor([
    { name: 'images', maxCount: 5 },
  ], {
    storage: diskStorage({
      destination: 'public/uploads/lands',
      filename: (req, file, callback) => {
        let name = `${Date.now()}-unknown`;
        if (file.originalname && typeof file.originalname === 'string') {
          name = `${Date.now()}-${path.parse(file.originalname).name}`;
        }
        const extension = path.parse(file.originalname || '').ext;
        const fileName = `${name}${extension}`;
        console.log("Uploading...");
        callback(null, fileName);
      },
    }),
    fileFilter: (req: any, file: any, cb: any) => {
      console.log(file);
      if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
        // Allow storage of file
        cb(null, true);
      } else {
        // Reject file
        cb(new ApiException(ErrorMessages.FILE_TYPE_NOT_MATCHING), false);
      }
    },
  }
  ))
  async create(@Query('areaId') areaId: string, @Body() createLandDto: LandCreateDto,
    @UploadedFiles() files?: {
      images?: Express.Multer.File[]
    }
  ) {
    
    // Access the file(s) if they exist
    const images = files?.images;
    if (!images) {
      throw new BadRequestException('Images file is required');
    }
    const filesPath = images?.map(file => `uploads/lands/${file.filename}`);
    var locations = null;
    const regex = /\[|\]/;
    if (regex.test(createLandDto.locations.toString())) {
      if (typeof createLandDto.locations === 'string') {
        locations = JSON.parse(createLandDto.locations);
      }
      else {
        locations = createLandDto.locations;

      }
    } else {
      //   console.log("chạy vào đây location còn lại đây (trường hợp swagger)");
      locations = JSON.parse(`[${createLandDto.locations}]`);
    }
    return this.landService.createLandCustom(areaId, {
      ...createLandDto,
      images: filesPath,
      locations
    });
  }


  @Get('all')
  @Note('Lấy tất cả vùng trồng')
  async getLands(): Promise<Land[]> {
    return await this.landService.getLands();
  }

  @Get('area')
  @Note('Lấy danh sách vùng trồng theo khu vực')
  async getLandsByAreaId(@Query() { areaId }: QueryAreaIdDto): Promise<Land[]> {
    return this.landService.getLandsByAreaId(areaId);
  }

  @Get('')
  @Note('Lấy vùng trồng theo id')
  async getLandById(@Query() { id }: QueryIdDto): Promise<Land> {
    return this.landService.getLandById(id);
  }




}
