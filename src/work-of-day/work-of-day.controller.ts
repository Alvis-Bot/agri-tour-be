import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { WorkOfDayService } from './work-of-day.service';
import { UpdateWorkOfDayDto } from 'src/common/dto/update-work-of-day.dto';
import { CreateWorkOfDayDto } from 'src/common/dto/create-work-of-day.dto';
import { ApiTags } from '@nestjs/swagger';
import { QueryWorkOfDayDTO } from './dto/create-query-dto';
import { WorkOfDay } from 'src/common/entities/work-of-day.entity';
import { Pagination } from 'src/common/pagination/pagination.dto';
import { PaginationModel } from 'src/common/pagination/pagination.model';
import { QueryIdDto } from 'src/common/dto/query-id.dto';
import { UpdateQueryWorkOfDayDTO } from './dto/update-query-dto';

@Controller('work-of-day')
@ApiTags('API Công việc trong ngày')
export class WorkOfDayController {
  constructor(private readonly workOfDayService: WorkOfDayService) { }

  @Post('create')
  async create(@Query() { landId, cropId }: QueryWorkOfDayDTO, @Body() createWorkOfDayDto: CreateWorkOfDayDto): Promise<WorkOfDay> {
    return this.workOfDayService.create(createWorkOfDayDto, { landId, cropId });
  }

  @Get('gets')
  async findAll(@Query() pagination: Pagination): Promise<PaginationModel<WorkOfDay>> {
    return await this.workOfDayService.findAll(pagination);
  }

  @Get('getById')
  async findOne(@Query() { id }: QueryIdDto): Promise<WorkOfDay> {
    return await this.workOfDayService.findOneById(id);
  }

  @Patch('update')
  async update(@Query() queryDTO: UpdateQueryWorkOfDayDTO, @Body() updateWorkOfDayDto: UpdateWorkOfDayDto): Promise<WorkOfDay> {
    return this.workOfDayService.update(queryDTO, updateWorkOfDayDto);
  }

  @Delete('delete')
  async remove(@Query() { id }: QueryIdDto) {
    return this.workOfDayService.remove(id);
  }
}
