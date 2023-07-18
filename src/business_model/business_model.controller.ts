import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BusinessModelService } from './business_model.service';
import { CreateBusinessModelDto } from './dto/create-business_model.dto';
import { UpdateBusinessModelDto } from './dto/update-business_model.dto';

@Controller('business-model')
export class BusinessModelController {
  constructor(private readonly businessModelService: BusinessModelService) {}

  // @Post()
  // create(@Body() createBusinessModelDto: CreateBusinessModelDto) {
  //   return this.businessModelService.create(createBusinessModelDto);
  // }

  // @Get()
  // findAll() {
  //   return this.businessModelService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.businessModelService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateBusinessModelDto: UpdateBusinessModelDto) {
  //   return this.businessModelService.update(+id, updateBusinessModelDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.businessModelService.remove(+id);
  // }
}
