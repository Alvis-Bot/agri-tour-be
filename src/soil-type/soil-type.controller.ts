import {  Controller, Get, Post, Query } from "@nestjs/common";
import { Note } from "../common/decorator/description.decorator";
import { ApiTags } from "@nestjs/swagger";
import {SoilTypeService} from "./soil-type.service";

@Controller('soil-type')
@ApiTags("Soil Type APIs")
export class SoilTypeController {

  constructor(private readonly soilTypeService: SoilTypeService) {
  }

  @Post()
  @Note('Tạo mới loại đất')
  async createSoilType(@Query('name') name: string) {
    return this.soilTypeService.createSoilType(name);
  }


  @Get('all')
  @Note('Lấy danh sách loại đất')
  async getSoilTypes() {
    return this.soilTypeService.getSoilTypes();
  }

}
