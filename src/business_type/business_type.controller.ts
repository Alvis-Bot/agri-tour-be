import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BusinessTypeService } from './business_type.service';
import { CreateBusinessTypeDto } from './dto/create-business_type.dto';
import { UpdateBusinessTypeDto } from './dto/update-business_type.dto';

@Controller('business-type')
export class BusinessTypeController {
  constructor(private readonly businessTypeService: BusinessTypeService) {}

  @Post()
  create(@Body() createBusinessTypeDto: CreateBusinessTypeDto) {
    return this.businessTypeService.create(createBusinessTypeDto);
  }

  @Get()
  findAll() {
    return this.businessTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.businessTypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBusinessTypeDto: UpdateBusinessTypeDto) {
    return this.businessTypeService.update(+id, updateBusinessTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.businessTypeService.remove(+id);
  }
}
