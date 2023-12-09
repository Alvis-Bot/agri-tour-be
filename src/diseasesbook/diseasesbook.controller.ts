import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DiseasesbookService } from './diseasesbook.service';
import { CreateDiseasesbookDto } from './dto/create-diseasesbook.dto';
import { UpdateDiseasesbookDto } from './dto/update-diseasesbook.dto';

@Controller('diseasesbook')
export class DiseasesbookController {
  constructor(private readonly diseasesbookService: DiseasesbookService) {}

  @Post()
  create(@Body() createDiseasesbookDto: CreateDiseasesbookDto) {
    return this.diseasesbookService.create(createDiseasesbookDto);
  }

  @Get()
  findAll() {
    return this.diseasesbookService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.diseasesbookService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDiseasesbookDto: UpdateDiseasesbookDto) {
    return this.diseasesbookService.update(+id, updateDiseasesbookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.diseasesbookService.remove(+id);
  }
}
