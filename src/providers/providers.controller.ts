import { Controller, Get, Post, Body, Patch, Query, Delete, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { CreateProviderDto } from '../common/dto/create-provider.dto';
import { Pagination } from 'src/common/pagination/pagination.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { UpdateProviderDto } from 'src/common/dto/update-provider.dto';
import { Provider } from 'src/common/entities/provider.entity';
@ApiTags(
  'API Nhà cung cấp'
)
@Controller('providers')
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) { }

  @Post()
  async create(@Body() createProviderDto: CreateProviderDto): Promise<Provider> {
    return this.providersService.create(createProviderDto);
  }

  @Get()
  async findAll(@Query() pagination: Pagination): Promise<Provider[]> {
    return await this.providersService.findAll(pagination);
  }

  @Get('get')
  async findOne(@Query('id') id: string) {
    return this.providersService.findOne(id);
  }

  @Patch('update')
  async update(@Query('id') id: string, @Body() updateProviderDto: UpdateProviderDto): Promise<Provider> {
    return await this.providersService.update(id, updateProviderDto);
  }

  @Delete('delete')
  async remove(@Query('id') id: string): Promise<Object> {
    return await this.providersService.remove(id);
  }
}
