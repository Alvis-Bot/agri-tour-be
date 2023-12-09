/* eslint-disable @typescript-eslint/ban-types */
import {Body, Controller, Delete, Get, Patch, Post, Query,} from '@nestjs/common';
import {VisitorService} from './visitor.service';
import {CreateVisitorDto} from './dto/create-visitor.dto';
import {UpdateVisitorDto} from './dto/update-visitor.dto';
import {ApiTags} from '@nestjs/swagger';
import {Visitor} from 'src/common/entities/visitor.entity';
import {PaginationModel} from 'src/common/pagination/pagination.model';
import {Pagination} from 'src/common/pagination/pagination.dto';
import {QueryIdDto} from 'src/common/dto/query-id.dto';
import {UUIDQuery} from "../common/decorator/uuid.decorator";

@Controller('visitor')
@ApiTags('API Khách tham quan')
export class VisitorController {
  constructor(private readonly visitorService: VisitorService) {}

  @Post('create')
  async create(@Body() dto: CreateVisitorDto): Promise<Visitor> {
    return this.visitorService.create(dto);
  }

  @Get('gets')
  async findAll(
    @Query() pagination: Pagination,
  ): Promise<PaginationModel<Visitor>> {
    return this.visitorService.findAll(pagination);
  }

  @Get('get')
  async findOne(@UUIDQuery('id') id: string): Promise<Visitor> {
    return this.visitorService.findOne(id);
  }

  @Patch('update')
  async update(
    @UUIDQuery('id') id: string,
    @Body() dto: UpdateVisitorDto,
  ): Promise<Visitor> {
    return await this.visitorService.update(id, dto);
  }

  @Delete('delete')
  async remove(@UUIDQuery('id') id: string): Promise<Object> {
    return this.visitorService.remove(id);
  }
}
