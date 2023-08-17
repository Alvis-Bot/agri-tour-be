import { Injectable } from '@nestjs/common';
import { CreateDiseasesbookDto } from './dto/create-diseasesbook.dto';
import { UpdateDiseasesbookDto } from './dto/update-diseasesbook.dto';

@Injectable()
export class DiseasesbookService {
  create(createDiseasesbookDto: CreateDiseasesbookDto) {
    return 'This action adds a new diseasesbook';
  }

  findAll() {
    return `This action returns all diseasesbook`;
  }

  findOne(id: number) {
    return `This action returns a #${id} diseasesbook`;
  }

  update(id: number, updateDiseasesbookDto: UpdateDiseasesbookDto) {
    return `This action updates a #${id} diseasesbook`;
  }

  remove(id: number) {
    return `This action removes a #${id} diseasesbook`;
  }
}
