import { Body, Controller, Delete, Get, Patch, Post, Query } from '@nestjs/common';
import { TypesService } from './types.service';
import { TypeCreateDto } from './dto/type-create.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { ApiTags } from '@nestjs/swagger';
import { Type } from '../common/entities/type.entity';
import { Note } from "../common/decorator/description.decorator";
import { UUIDQuery } from "../common/decorator/uuid.decorator";

@Controller('types')
@ApiTags('Thêm loại danh mục')
export class TypesController {

  constructor(private readonly typesService: TypesService) { }
  @Post()
  @Note('Khởi tạo danh mục')
  async init() {
    return await this.typesService.onModuleInit();
  }

  @Post('create')
  @Note('Tạo loại danh mục')
  create(@Body() dto: TypeCreateDto): Promise<Type> {
    return this.typesService.createType(dto);
  }

  @Get('gets')
  @Note('Lấy tất cả loại danh mục')
  async getTypes() {
    return await this.typesService.getTypes();
  }

  @Get('get')
  @Note('Lấy loại danh mục theo id')
  async getTypeById(@UUIDQuery('id') id: string): Promise<Type> {
    return this.typesService.getTypeById(id);
  }

  @Get('getByName')
  @Note('Lấy loại danh mục theo tên')
  async getTypeByName(@Query('name') name: string) {
    return this.typesService.getTypeByName(name);
  }
  @Patch('update')
  @Note('Cập nhật loại danh mục')
  async updateType(@UUIDQuery('id') id: string, @Body() dto: UpdateTypeDto): Promise<Type> {
    return this.typesService.updateType(id, dto);
  }

  @Delete('delete')
  @Note('Xóa loại danh mục')
  async deleteType(@UUIDQuery('id') id: string): Promise<void> {
    return this.typesService.deleteType(id);
  }

}
