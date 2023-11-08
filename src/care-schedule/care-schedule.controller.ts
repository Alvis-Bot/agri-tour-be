import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CareScheduleService } from './care-schedule.service';
import { CreateCareScheduleDto } from './dto/create-care-schedule.dto';
import { UpdateCareScheduleDto } from './dto/update-care-schedule.dto';
import { CareSchedule } from 'src/common/entities/care-schedule.entity';
import { PaginationModel } from 'src/common/pagination/pagination.model';
import { Pagination } from 'src/common/pagination/pagination.dto';
import { QueryIdDto } from 'src/common/dto/query-id.dto';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@Controller('care-schedule')
@ApiTags("API Lịch chăm sóc")
export class CareScheduleController {
  constructor(private readonly careScheduleService: CareScheduleService) { }

  @Post('create')
  async create(@Body() createCareScheduleDto: CreateCareScheduleDto): Promise<CareSchedule> {
    return await this.careScheduleService.create(createCareScheduleDto);
  }

  @Get('gets')
  async findAll(@Query() pagination: Pagination): Promise<PaginationModel<CareSchedule>> {
    return await this.careScheduleService.findAll(pagination);
  }

  @Get('get')
  async findOne(@Query() { id }: QueryIdDto): Promise<CareSchedule> {
    return await this.careScheduleService.findOne(id);
  }

  @Patch('update')
  async update(@Query() { id }: QueryIdDto, @Body() updateCareScheduleDto: UpdateCareScheduleDto): Promise<CareSchedule> {
    return await this.careScheduleService.update(id, updateCareScheduleDto);
  }

  @Delete('remove')
  async remove(@Query() { id }: QueryIdDto): Promise<Response> {
    return await this.careScheduleService.remove(id);
  }
}
