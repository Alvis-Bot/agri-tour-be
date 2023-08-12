import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors
} from "@nestjs/common";
import {Router} from "../common/enum/router";
import {Service} from "../common/enum/service";
import {LandCreateDto} from "../common/dto/land-create.dto";
import {Land} from "../common/entities/land.entity";
import {ApiConsumes, ApiTags} from "@nestjs/swagger";

import {Note} from "../common/decorator/description.decorator";
import {IAreaService} from "../area/service/area";
import {QueryAreaIdDto} from "../common/dto/query-area-id.dto";
import {QueryIdDto} from "../common/dto/query-id.dto";
import {LandService} from "./land.service";
import {FileFieldsInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import * as path from "path";
import {ApiException} from "../exception/api.exception";
import {ErrorMessages} from "../exception/error.code";
import {ApiFiles} from "../common/decorator/file.decorator";
import {FileTypes} from "../common/enum";

@Controller(Router.LAND)
@ApiTags('Land APIs')
export class LandController {
  constructor(private readonly landService: LandService,
    @Inject(Service.AREA_SERVICE) private readonly areaService: IAreaService) {
  }

  @Post('create')
  @ApiFiles("images", 10, FileTypes.IMAGE)
  async create(@Query('areaId') areaId: string, @Body() dto: LandCreateDto, @UploadedFiles() files: Express.Multer.File[]
  ) {
    console.log("dto", dto.locations);
    console.log("files", files);
    return this.landService.createLand(areaId, dto, files);
  }


  // @Post('creatsnv')
  // // @ApiFiles("files", 10, FileTypes.IMAGE)
  // @ApiConsumes('multipart/form-data')
  // @Note("Tạo mới vùng canh tác (test)")
  // async createTest(@Body() dto: LandCreateDto) {
  //   console.log("dto", dto);
  // }
  //


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
