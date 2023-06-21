import { Body, Controller, Inject, Post, Query, UseGuards } from "@nestjs/common";
import { Router } from "../common/enum/router";
import { ILandService } from "./service/land";
import { Service } from "../common/enum/service";
import { LandCreateDto } from "../common/dto/land-create.dto";
import { Land } from "../common/entities/land.entity";
import { ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/guard/jwt-auth.guard";

@Controller(Router.LAND)
@ApiTags(Router.LAND)
@UseGuards(JwtAuthGuard)
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
