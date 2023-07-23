import { Controller, Get, Post, Body, Patch, Query, Delete, UseGuards, Req } from '@nestjs/common';
import { FarmingCalenderService } from './farming_calender.service';
import { CreateFarmingCalenderDto } from '../common/dto/create-farming_calender.dto';
import { UpdateFarmingCalenderDto } from 'src/common/dto/update-farming_calender.dto';
import { FarmingCalender } from 'src/common/entities/farming_calender.entity';
import { AuthGuard } from 'src/auth/guard/Auth.guard';
import { User } from "../common/entities/user.entity";
import { AuthUser } from "../common/decorator/user.decorator";
import { QueryLandId } from "./dto/query.dto";
import { Land } from "../common/entities/land.entity";

@Controller('farming-calender')
export class FarmingCalenderController {
  constructor(private readonly farmingCalenderService: FarmingCalenderService) { }

  @UseGuards(AuthGuard)
  @Post('create')
  async createFarmingCalender(
    @Req() req,
    @AuthUser() user : User,
    @Query() { landId }: QueryLandId,
    @Body() dto: CreateFarmingCalenderDto): Promise<FarmingCalender> {
    return await this.farmingCalenderService.createFarmingCalender(landId ,dto , user);
  }
  @Get('gets')
  async getAllFarmingCalenders() {
    return await this.farmingCalenderService.getAllFarmingCalenders();
  }

  @Get('get')
  async getFarmingCalenderById(@Query('id') id: string) {
    return await this.farmingCalenderService.getFarmingCalenderById(id);
  }

  @Patch('update')
  async updateFarmingCalender(@Query('id') id: string, @Body() data: UpdateFarmingCalenderDto): Promise<FarmingCalender> {
    return await this.farmingCalenderService.updateFarmingCalender(id, data);
  }

  @Delete('delete')
  async deleteFarmingCalender(@Query('id') id: string) {
    return await this.farmingCalenderService.deleteFarmingCalender(id);
  }
}
