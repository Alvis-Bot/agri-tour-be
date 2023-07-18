import { Controller, Get, Post, Body, Patch, Query, Delete } from '@nestjs/common';
import { FarmingCalenderService } from './farming_calender.service';
import { CreateFarmingCalenderDto } from '../common/dto/create-farming_calender.dto';
import { UpdateFarmingCalenderDto } from 'src/common/dto/update-farming_calender.dto';
import { FarmingCalender } from 'src/common/entities/farming_calender.entity';

@Controller('farming-calender')
export class FarmingCalenderController {
  constructor(private readonly farmingCalenderService: FarmingCalenderService) { }

  @Post('create')
  async createFarmingCalender(@Query('landId') landId: string, @Query('cateDetailsId') cateDetailId: string, @Body() data: CreateFarmingCalenderDto):Promise<CreateFarmingCalenderDto>{
    return await this.farmingCalenderService.createFarmingCalender(data);
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
