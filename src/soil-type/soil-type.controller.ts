import { Body, Controller, Get, Inject, Post, Query } from "@nestjs/common";
import { ISoilTypeService } from "./service/soil-type";
import { Service } from "../common/enum/service";
import { Description } from "../common/decorator/description.decorator";

@Controller('soil-type')
export class SoilTypeController {

  constructor(@Inject(Service.SOIL_TYPE_SERVICE) private readonly soilTypeService: ISoilTypeService) {
  }

  @Post()
  @Description('Tạo mới loại đất')
  async createSoilType(@Query('name') name: string) {
    return this.soilTypeService.createSoilType(name);
  }

  @Get('all')
  @Description('Lấy danh sách loại đất')
  async getSoilTypes() {
    return this.soilTypeService.getSoilTypes();
  }
}
