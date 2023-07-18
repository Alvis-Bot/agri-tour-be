import { Controller, Get, Post, Body, Patch, Query, Delete, UseGuards, Req } from '@nestjs/common';
import { FarmingCalenderService } from './farming_calender.service';
import { CreateFarmingCalenderDto } from '../common/dto/create-farming_calender.dto';
import { UpdateFarmingCalenderDto } from 'src/common/dto/update-farming_calender.dto';
import { FarmingCalender } from 'src/common/entities/farming_calender.entity';
import { AuthGuard } from 'src/auth/guard/Auth.guard';

@Controller('farming-calender')
export class FarmingCalenderController {
  constructor(private readonly farmingCalenderService: FarmingCalenderService) { }

  @UseGuards(AuthGuard)
  @Post('create')
  async createFarmingCalender(@Req() req, @Query('landId') landId: string, @Query('cateDetailsId') categoryDetailId: string, @Body() data: CreateFarmingCalenderDto): Promise<CreateFarmingCalenderDto> {
    return await this.farmingCalenderService.createFarmingCalender({
      ...data,
      landId,
      categoryDetailId,
      userId: req.uid
    });
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
