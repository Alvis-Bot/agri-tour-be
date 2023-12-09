import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { HarvestService } from './harvest.service';
import { CreateHarvestDto } from './dto/create-harvest.dto';
import { UpdateHarvestDto } from './dto/update-harvest.dto';
import { ApiTags } from '@nestjs/swagger';
import { Harvest } from 'src/common/entities/harvest.entity';
import { PaginationModel } from 'src/common/pagination/pagination.model';
import { Pagination } from 'src/common/pagination/pagination.dto';
import { Response } from 'express';

@Controller('harvest')
@ApiTags("API Tạo thu hoạch")
export class HarvestController {
  constructor(private readonly harvestService: HarvestService) { }

  @Post('create-harvest')
  async create(@Body() createHarvestDto: CreateHarvestDto): Promise<Harvest> {
    return await this.harvestService.create(createHarvestDto);
  }

  @Get('gets')
  async findAll(@Query() pagination: Pagination): Promise<PaginationModel<Harvest>> {
    return await this.harvestService.findAll(pagination);
  }

  @Get('get')
  async findOne(@Query('id') id: string): Promise<Harvest> {
    return await this.harvestService.findOne(id);
  }

  @Patch('update-harvest')
  async update(@Query('id') id: string, @Body() updateHarvestDto: UpdateHarvestDto): Promise<Harvest> {
    return await this.harvestService.update(id, updateHarvestDto);
  }

  @Delete('delete')
  async remove(@Query('id') id: string): Promise<Response> {
    return await this.harvestService.remove(id);
  }
}
