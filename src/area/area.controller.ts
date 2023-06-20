import { Body, Controller, Get, Inject, Param, Post, Query, ValidationPipe } from "@nestjs/common";
import { Router } from "../common/enum/router";
import { Description } from "../common/decorator/description.decorator";
import { AreaCreateDto } from "../common/dto/area-create.dto";
import { IAreaService } from "./service/area";
import { Service } from "../common/enum/service";
import { IS_UUID, ValidationTypes, Validator } from "class-validator";
import { ApiBody } from "@nestjs/swagger";

@Controller(Router.AREA)
export class AreaController {

  constructor(@Inject(Service.AREA_SERVICE) private areaService: IAreaService) {
  }

  @Post()
  @Description("Tạo mới một khu vực")
  async createArea(@Body() dto : AreaCreateDto ,@Query('farmId') farmId: string){
    return this.areaService.createArea(dto ,farmId);
  }

  @Get('all')
  @Description("Lấy danh sách khu vực")
  async getAreas(){
    return this.areaService.getAreas();
  }

  @Get()
  @Description("Lấy thông tin khu vực theo id")
  async getAreaById(@Query('id') id: string){
    return this.areaService.getAreaById(id);

  }

}
