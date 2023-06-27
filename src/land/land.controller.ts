import { Body, Controller, Get, Inject, Post, Query, UseGuards } from "@nestjs/common";
import { Router } from "../common/enum/router";
import { ILandService } from "./service/land";
import { Service } from "../common/enum/service";
import { LandCreateDto } from "../common/dto/land-create.dto";
import { Land } from "../common/entities/land.entity";
import { ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/guard/jwt-auth.guard";
import { Description } from "../common/decorator/description.decorator";
import { IAreaService } from "../area/service/area";
import { QueryAreaIdDto } from "../common/dto/query-area-id.dto";
import { QueryIdDto } from "../common/dto/query-id.dto";

@Controller(Router.LAND)
@ApiTags('Land APIs')
@UseGuards(JwtAuthGuard)
export class LandController {
  constructor(@Inject(Service.LAND_SERVICE) private readonly landService: ILandService,
              @Inject(Service.AREA_SERVICE) private readonly areaService: IAreaService) {
  }

  @Post()
  @Description('Tạo vùng trồng')
  async createLand(
    @Query() { areaId }: QueryAreaIdDto,
    @Body() dto: LandCreateDto): Promise<Land> {
    const area = await this.areaService.getAreaById(areaId)
    return this.landService.createLand(dto , area);
  }

  @Get('all')
  @Description('Lấy tất cả vùng trồng')
  async getLands(): Promise<Land[]> {
    return this.landService.getLands();
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

}
