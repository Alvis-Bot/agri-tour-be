import { Controller, Get, Post, Body, Patch, Query, Delete } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { CreateProviderDto } from '../common/dto/create-provider.dto';
import { Pagination } from 'src/common/pagination/pagination.dto';
import { ApiTags } from '@nestjs/swagger';
import { UpdateProviderDto } from 'src/common/dto/update-provider.dto';
@ApiTags(
  'API Nhà cung cấp'
)
@Controller('providers')
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) { }

  @Post()
  create(@Body() createProviderDto: CreateProviderDto) {
    return this.providersService.create(createProviderDto);
  }

  @Get()
  findAll(pagination: Pagination) {
    return this.providersService.findAll();
  }

  @Get('get')
  findOne(@Query('id') id: string) {
    return this.providersService.findOne(id);
  }

  @Patch('update')
  update(@Query('id') id: string, @Body() updateProviderDto: UpdateProviderDto) {
    return this.providersService.update(id, updateProviderDto);
  }

  @Delete('delete')
  remove(@Query('id') id: string) {
    return this.providersService.remove(id);
  }
}
