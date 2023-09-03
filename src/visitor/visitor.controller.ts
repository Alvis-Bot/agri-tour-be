/* eslint-disable @typescript-eslint/ban-types */
import { Controller, Get, Post, Body, Patch,  Delete, Query } from '@nestjs/common';
import { VisitorService } from './visitor.service';
import { CreateVisitorDto } from './dto/create-visitor.dto';
import { UpdateVisitorDto } from './dto/update-visitor.dto';
import { ApiTags } from '@nestjs/swagger';
import { Visitor } from 'src/common/entities/visitor.entity';
import { PaginationModel } from 'src/common/pagination/pagination.model';
import { Pagination } from 'src/common/pagination/pagination.dto';
import { QueryIdDto } from 'src/common/dto/query-id.dto';

@Controller('visitor')
@ApiTags('API Khách tham quan')
export class VisitorController {
  constructor(private readonly visitorService: VisitorService) { }

  @Post('create')
  async create(@Body() createVisitorDto: CreateVisitorDto): Promise<Visitor> {
    return this.visitorService.create(createVisitorDto);
  }

  @Get('gets')
  async findAll(@Query() pagination: Pagination): Promise<PaginationModel<Visitor>> {
    return this.visitorService.findAll(pagination);
  }

  @Get('get')
  async findOne(@Query() { id }: QueryIdDto): Promise<Visitor> {
    return this.visitorService.findOne(id);
  }

  @Patch('update')
  async update(@Query() { id }: QueryIdDto, @Body() updateVisitorDto: UpdateVisitorDto): Promise<Visitor> {
    return await this.visitorService.update(id, updateVisitorDto);
  }

  @Delete('delete')
  async remove(@Query() { id }: QueryIdDto): Promise<object> {
    return this.visitorService.remove(id);
  }
}
