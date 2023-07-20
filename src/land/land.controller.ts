import { BadRequestException, Body, Controller, Get, Inject, Logger, Patch, Post, Query, Req, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { Router } from "../common/enum/router";
import { ILandService } from "./service/land";
import { Service } from "../common/enum/service";
import { LandCreateDto } from "../common/dto/land-create.dto";
import { Land } from "../common/entities/land.entity";
import { ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/guard/jwt-auth.guard";
import { Description } from "../common/decorator/description.decorator";
import { IAreaService } from "../area/service/area";
import { QueryAreaIdDto } from "../common/dto/query-area-id.dto";
import { QueryIdDto } from "../common/dto/query-id.dto";
import { ApiFiles } from "../area/api-file.decorator";
import { diskStorage } from "multer";
import * as path from 'path';

import { ApiException } from "../exception/api.exception";
import { ErrorCode } from "../exception/error.code";

import { Location as ILocation } from '../common/interface'
import { FileFieldsInterceptor } from "@nestjs/platform-express";
@Controller(Router.LAND)
@ApiTags('Land APIs')
// @UseGuards(JwtAuthGuard)
export class LandController {
  constructor(@Inject(Service.LAND_SERVICE) private readonly landService: ILandService,
    @Inject(Service.AREA_SERVICE) private readonly areaService: IAreaService) {
  }

  @Post('create')
  @ApiConsumes('multipart/form-data', 'application/json')
  @Description("Tạo mới vùng canh tác")


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
        cb(new ApiException(ErrorCode.FILE_TYPE_NOT_MATCHING), false);
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
  // @Post()
  // @Description('Tạo vùng trồng')
  // async createLand(
  //   @Query('areaId') areaId: string,
  //   @Body() dto: LandCreateDto): Promise<Land | any> {
  //   return dto
  //   // const area = await this.areaService.getAreaById(areaId)
  //   // return this.landService.createLand(dto, area);
  // }

  @Get('all')
  @Description('Lấy tất cả vùng trồng')
  async getLands(): Promise<Land[]> {
    return await this.landService.getLands();
  }

  @Get('area')
  @Description('Lấy danh sách vùng trồng theo khu vực')
  async getLandsByAreaId(@Query() { areaId }: QueryAreaIdDto): Promise<Land[]> {
    return this.landService.getLandsByAreaId(areaId);
  }

  @Get('')
  @Description('Lấy vùng trồng theo id')
  async getLandById(@Query() { id }: QueryIdDto): Promise<Land> {
    return this.landService.getLandById(id);
  }


  // @Patch('image')
  // @Description("Upload file")
  // @ApiFiles('images', true, 20, {
  //   storage: diskStorage({
  //     destination: 'public/uploads/lands',
  //     filename: (req, file, cb) => {
  //       const randomName = Array(32)
  //         .fill(null)
  //         .map(() => Math.round(Math.random() * 16).toString(16))
  //         .join('');
  //       return cb(null, `${randomName}${extname(file.originalname)}`);
  //     },
  //   }),
  //   fileFilter: (req: any, file: any, cb: any) => {
  //     console.log(file);
  //     if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
  //       // Allow storage of file
  //       cb(null, true);
  //     } else {
  //       // Reject file
  //       cb(new ApiException(ErrorCode.FILE_TYPE_NOT_MATCHING), false);
  //     }
  //   },
  // })
  // async uploadFile(@Query() { landId }: QueryLandIdDto,
  //   @Body() dto: UploadLandDto,
  //   @UploadedFiles() files: Express.Multer.File[],) {
  //   return this.landService.uploadFile(landId, dto, files);
  // }

}
