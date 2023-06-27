import {
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
  ValidationPipe
} from "@nestjs/common";
import { Router } from "../common/enum/router";
import { Description } from "../common/decorator/description.decorator";
import { AreaCreateDto } from "../common/dto/area-create.dto";
import { IAreaService } from "./service/area";
import { Service } from "../common/enum/service";
import { IS_UUID, ValidationTypes, Validator } from "class-validator";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { QueryFarmIdDto } from "./dto/query-farm-id.dto";
import { ApiFile, ApiFiles } from "./api-file.decorator";
import { QueryAreaIdDto } from "./dto/query-area-id.dto";
import { extname } from "path";
import { ApiException } from "../exception/api.exception";
import { ErrorCode } from "../exception/error.code";
import { diskStorage } from "multer";
import { UploadDto } from "./dto/upload.dto";
import { response } from "express";
import { JwtAuthGuard } from "../auth/guard/jwt-auth.guard";

@Controller(Router.AREA)
@ApiTags("Area APIs  (area)")
@UseGuards(JwtAuthGuard)
export class AreaController {

  constructor(@Inject(Service.AREA_SERVICE) private areaService: IAreaService) {
  }

  @Post()
  @Description("Tạo mới một khu đất")
  async createArea(
    @Body() dto : AreaCreateDto ,
    @Query() { farmId }: QueryFarmIdDto){
    return this.areaService.createArea(dto ,farmId);
  }



  @Post('upload')
  @Description("Upload file")
  @ApiFiles('avatars', true, 20, {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const randomName = Array(32)
          .fill(null)
          .map(() => Math.round(Math.random() * 16).toString(16))
          .join('');
        return cb(null, `${randomName}${extname(file.originalname)}`);
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
  })
  async uploadFile( @Query() { areaId }: QueryAreaIdDto,
                    @Body() dto: UploadDto,
                    @UploadedFiles() files: Express.Multer.File[],){
    return this.areaService.uploadFile(files ,areaId);
  }

  @Get('all')
  @Description("Lấy danh sách khu vực")
  async getAreas(){
    return this.areaService.getAreas();
  }

  @Get('farm')
  @Description("Lấy danh sách khu vực theo id farm")
  async getAreasByFarmId(@Query() { farmId }: QueryFarmIdDto){
    return this.areaService.getAreasByFarmId(farmId);
  }

  @Get()
  @Description("Lấy thông tin khu vực theo id")
  async getAreaById(@Query('id') id: string){
    return this.areaService.getAreaById(id);
  }

}
