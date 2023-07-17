import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FarmingCalenderService } from './farming_calender.service';
import { CreateFarmingCalenderDto } from '../common/dto/create-farming_calender.dto';
import { UpdateFarmingCalenderDto } from 'src/common/dto/update-farming_calender.dto';

@Controller('farming-calender')
export class FarmingCalenderController {
  constructor(private readonly farmingCalenderService: FarmingCalenderService) {}

  @Post()
  create(@Body() createFarmingCalenderDto: CreateFarmingCalenderDto) {
    return this.farmingCalenderService.create(createFarmingCalenderDto);
  }

  @Get()
  findAll() {
    return this.farmingCalenderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.farmingCalenderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFarmingCalenderDto: UpdateFarmingCalenderDto) {
    return this.farmingCalenderService.update(+id, updateFarmingCalenderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.farmingCalenderService.remove(+id);
  }
}
