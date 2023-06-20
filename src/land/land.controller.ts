import { Body, Controller, Inject, Post, Query } from "@nestjs/common";
import { Router } from "../common/enum/router";
import { ILandService } from "./service/land";
import { Service } from "../common/enum/service";
import { LandCreateDto } from "../common/dto/land-create.dto";
import { Land } from "../common/entities/land.entity";
import { ApiTags } from "@nestjs/swagger";

@Controller(Router.LAND)
@ApiTags(Router.LAND)
export class LandController {
  constructor(@Inject(Service.LAND_SERVICE) private readonly landService: ILandService) {
  }

  @Post()
  async createLand(
    @Query('areaId') areaId: string,
    @Query('soilTypeId') soilTypeId: string,
    @Body() dto: LandCreateDto): Promise<Land> {
    return this.landService.createLand(dto , areaId , soilTypeId);
  }

}
