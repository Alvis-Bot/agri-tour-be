import {Body, Controller, Delete, Get, Patch, Post, Query} from '@nestjs/common';
import {ProvidersService} from './providers.service';
import {CreateProviderDto} from '../common/dto/create-provider.dto';
import {Pagination} from 'src/common/pagination/pagination.dto';
import {ApiTags} from '@nestjs/swagger';
import {UpdateProviderDto} from 'src/common/dto/update-provider.dto';
import {Provider} from 'src/common/entities/provider.entity';
import {UUIDQuery} from "../common/decorator/uuid.decorator";
import {Note} from "../common/decorator/description.decorator";

@ApiTags('API Nhà cung cấp')
@Controller('providers')
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) { }

  @Post()
  @Note('Tạo mới nhà cung cấp')
  async create(@Body() dto: CreateProviderDto): Promise<Provider> {
    return this.providersService.createProvider(dto);
  }

  @Get()
  @Note('Lấy danh sách nhà cung cấp')
  async getPaginationProviders(@Query() pagination: Pagination) {
    return await this.providersService.getPaginationProviders(pagination);
  }

  @Get('get')
  @Note('Lấy thông tin nhà cung cấp theo id')
  async getProviderById(@UUIDQuery('id') id: string) {
    return this.providersService.getProviderById(id);
  }

  @Patch('update')
  @Note('Cập nhật thông tin nhà cung cấp')
  async update(@UUIDQuery('id') id: string, @Body() dto: UpdateProviderDto): Promise<Provider> {
    return await this.providersService.updateProvider(id, dto);
  }

  @Delete('delete')
  @Note('Xóa nhà cung cấp')
  async remove(@UUIDQuery('id') id: string): Promise<void> {
    await this.providersService.removeProvider(id);
  }
}
