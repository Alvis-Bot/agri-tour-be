import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { BillRequestService } from './bill-request.service';
import { CreateBillRequestDto } from './dto/create-bill-request.dto';
import { UpdateBillRequestDto } from './dto/update-bill-request.dto';
import { BillRequest } from 'src/common/entities/bill-request.entity';
import { PaginationModel } from 'src/common/pagination/pagination.model';
import { Pagination } from 'src/common/pagination/pagination.dto';
import { QueryIdDto } from 'src/common/dto/query-id.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags("API Phiếu yêu cầu")
@Controller('bill-request')
export class BillRequestController {
  constructor(private readonly billRequestService: BillRequestService) { }

  @Post('create-bill-request')
  async create(@Body() createBillRequestDto: CreateBillRequestDto): Promise<BillRequest> {
    return await this.billRequestService.create(createBillRequestDto);
  }

  @Get('gets')
  async findAll(@Query() pagination: Pagination): Promise<PaginationModel<BillRequest>> {
    return this.billRequestService.findAll(pagination);
  }

  @Get('get')
  async findOne(@Query() { id }: QueryIdDto): Promise<BillRequest> {
    return this.billRequestService.findOne(id);
  }

  @Put('update')
  async update(@Query() { id }: QueryIdDto, @Body() dto: UpdateBillRequestDto): Promise<BillRequest> {
    return this.billRequestService.update(id, dto);
  }

  @Delete('delete')
  async remove(@Query() { id }: QueryIdDto): Promise<Object> {
    return this.billRequestService.remove(id);
  }
}
