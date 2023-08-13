import {BadRequestException, Body, Controller, Get, Post, Query, UploadedFiles, UseInterceptors,} from "@nestjs/common";
import {Router} from "../common/enum";
import {Note} from "../common/decorator/description.decorator";
import {AreaCreateDto} from "../common/dto/area-create.dto";
import {ApiConsumes, ApiTags} from "@nestjs/swagger";
import {QueryFarmIdDto} from "./dto/query-farm-id.dto";
import * as path from "path";
import {ApiException} from "../exception/api.exception";
import {diskStorage} from "multer";
import {FileFieldsInterceptor} from "@nestjs/platform-express";
import {ErrorMessages} from "../exception/error.code";
import {AreaService} from "./area.service";

@Controller(Router.AREA)
@ApiTags("Area APIs  (area)")
// @UseGuards(JwtAuthGuard)
export class AreaController {

  constructor(private areaService: AreaService) {
  }

  @Post()
  @Note("Tạo mới một khu đất")
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
        cb(new ApiException(ErrorMessages.FILE_TYPE_NOT_MATCHING), false);
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
  ): Promise<AreaCreateDto> {

    // Access the file(s) if they exist
    const images = files?.avatars;
    if (!images) {
      throw new BadRequestException('Images file is required');
    }
    const filesPath = images?.map(file => `uploads/areas/${file.filename}`);
    var locations = null;
    const regex = /\[|\]/;

    if (regex.test(dto.locations.toString())) {
      if (typeof dto.locations === 'string') {
        locations = JSON.parse(dto.locations);
        console.log("postman add");
      }
      else {
        locations = dto.locations;
        console.log("app and web add");
      }

    } else {
      //   console.log("chạy vào đây location còn lại đây (trường hợp swagger)");
      locations = JSON.parse(`[${dto.locations}]`);
      console.log("swagger add");
    }
    console.log(dto.locations, "log body gửi lên :))");
    return await this.areaService.createArea({
      ...dto,
      avatars: filesPath,
      locations
    }, farmId)
  }



  @Get('all')
  @Note("Lấy danh sách khu vực")
  async getAreas() {
    return this.areaService.getAreas();
  }

  @Get('farm')
  @Note("Lấy danh sách khu vực theo id farm")
  async getAreasByFarmId(@Query() { farmId }: QueryFarmIdDto) {
    return this.areaService.getAreasByFarmId(farmId);
  }

  @Get()
  @Note("Lấy thông tin khu vực theo id")
  async getAreaById(@Query('id') id: string) {
    return this.areaService.getAreaById(id);
  }

}
