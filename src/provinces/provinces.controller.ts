import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProvincesService } from './provinces.service';
import { CreateProvinceDto } from './dto/create-province.dto';
import { UpdateProvinceDto } from './dto/update-province.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('provinces')
@ApiTags(
  'API TỈNH THÀNH'
)
export class ProvincesController {
  constructor(private readonly provincesService: ProvincesService) {}

  
  @Post('init-province')
  async initDistrict():Promise<any>{
    return await this.provincesService.create();
  }
  // @Post()
  // create(@Body() createProvinceDto: CreateProvinceDto) {
  //   return this.provincesService.create(createProvinceDto);
  // }

  // @Get()
  // findAll() {
  //   return this.provincesService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.provincesService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProvinceDto: UpdateProvinceDto) {
  //   return this.provincesService.update(+id, updateProvinceDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.provincesService.remove(+id);
  // }
}