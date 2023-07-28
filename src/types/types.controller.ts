import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TypesService } from './types.service';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { ApiTags } from '@nestjs/swagger';
import { Type } from './entities/type.entity';

@Controller('types')
@ApiTags('Thêm loại danh mục')
export class TypesController {
  constructor(private readonly typesService: TypesService) { }

  @Post('init')
  initData() {
    return this.typesService.initData();
  }

  @Post('create')
  create(@Body() createTypeDto: CreateTypeDto) {
    return this.typesService.create(createTypeDto);
  }

  @Get('gets')
  findAll() {
    return this.typesService.findAll();
  }

  @Get('get')
  findOne(@Query('id') id: string) {
    return this.typesService.findOne(id);
  }

  @Get('getByName')
  findByName(@Query('name') name: string) {
    return this.typesService.findOneByName(name);
  }
  @Patch('update')
  updateType(@Query('id') id: string, @Body() dto: UpdateTypeDto): Promise<Type> {
    return this.typesService.update(id, dto);
  }

  @Delete('delete')
  deleteType(@Query('id') id: string): Promise<void> {
    return this.typesService.deleteType(id);
  }

}
