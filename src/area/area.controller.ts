import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Query,
  Res,
  UploadedFile,
  UploadedFiles, UseGuards,
  UseInterceptors,
  ValidationPipe
} from "@nestjs/common";
import { Router } from "../common/enum/router";
import { Description } from "../common/decorator/description.decorator";
import { AreaCreateDto } from "../common/dto/area-create.dto";
import { IAreaService } from "./service/area";
import { Service } from "../common/enum/service";
import { IS_UUID, ValidationTypes, Validator } from "class-validator";
import { ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { QueryFarmIdDto } from "./dto/query-farm-id.dto";
import { ApiFile, ApiFiles } from "./api-file.decorator";
import { QueryAreaIdDto } from "./dto/query-area-id.dto";
import * as path from "path";
import { ApiException } from "../exception/api.exception";
import { ErrorCode } from "../exception/error.code";
import { diskStorage } from "multer";
import { UploadDto } from "./dto/upload.dto";
import { response } from "express";
import { JwtAuthGuard } from "../auth/guard/jwt-auth.guard";
import { FileFieldsInterceptor } from "@nestjs/platform-express";

@Controller(Router.AREA)
@ApiTags("Area APIs  (area)")
// @UseGuards(JwtAuthGuard)
export class AreaController {

  constructor(@Inject(Service.AREA_SERVICE) private areaService: IAreaService) {
  }

  @Post()
  @Description("Tạo mới một khu đất")
  @ApiConsumes('multipart/form-data', 'application/json')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'avatars', maxCount: 5 },
  ], {
    storage: diskStorage({
      destination: 'public/uploads/areas',
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
  async createArea(
    @Body() dto: AreaCreateDto,
    @Query() { farmId }: QueryFarmIdDto,
    @UploadedFiles() files?: {
      avatars?: Express.Multer.File[]
    }
  ): Promise<AreaCreateDto | any> {
    // Access the file(s) if they exist
    const images = files?.avatars;
    if (!images) {
      throw new BadRequestException('Images file is required');
    }
    const filesPath = images?.map(file => `uploads/areas/${file.filename}`);
    let locations = null;
    let flag = false;
    let newLocation = null;
    const regex = /\[|\]/;
    if (regex.test(dto.locations.toString())) {
      locations = dto.locations;
      flag = true;
      newLocation = JSON.parse(locations);
    } else {
      locations = JSON.parse(`[${dto.locations}]`);
    }

    return await this.areaService.createArea({
      ...dto,
      avatars: filesPath,
      locations: flag === true ? newLocation : locations
    }, farmId)
  }



  @Get('all')
  @Description("Lấy danh sách khu vực")
  async getAreas() {
    return this.areaService.getAreas();
  }

  @Get('farm')
  @Description("Lấy danh sách khu vực theo id farm")
  async getAreasByFarmId(@Query() { farmId }: QueryFarmIdDto) {
    return this.areaService.getAreasByFarmId(farmId);
  }

  @Get()
  @Description("Lấy thông tin khu vực theo id")
  async getAreaById(@Query('id') id: string) {
    return this.areaService.getAreaById(id);
  }

}
