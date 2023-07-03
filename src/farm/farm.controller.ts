import { Body, Controller, Get, Inject, Post, UseGuards } from "@nestjs/common";
import { Router } from "../common/enum/router";
import { Service } from "../common/enum/service";
import { IFarmService } from "./service/farm";
import { Description } from "../common/decorator/description.decorator";
import { FarmCreateDto } from "../common/dto/farm-create.dto";
import { JwtAuthGuard } from "../auth/guard/jwt-auth.guard";
import { AuthUser } from "../common/decorator/user.decorator";
import { User } from "../common/entities/user.entity";
import { ApiTags } from "@nestjs/swagger";
import { Public } from "../auth/public.meta";

@Controller(Router.FARM)
@UseGuards(JwtAuthGuard)
@ApiTags('Farm APIs')
export class FarmController {
  constructor (@Inject(Service.FARM_SERVICE) private readonly farmService: IFarmService) {
  }

  @Post()
  @Description("Tạo mới một trang trại")
  async createFarm (@AuthUser() user: User ,@Body() dto: FarmCreateDto) {
    return this.farmService.createFarm(dto ,user);
  }
  @Public()
  @Get()
  @Description("Lấy thông tin trang trại theo id")
  async getFarmById (@Body('id') id: string) {
    return this.farmService.getFarmById(id);
  }

  @Public()
  @Get('all')
  @Description("Lấy danh sách trang trại")
  async getFarms () {
    return this.farmService.getFarms();
  }


}
