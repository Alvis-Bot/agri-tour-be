import { Injectable } from '@nestjs/common';
import { CreateBusinessModelDto } from './dto/create-business_model.dto';
import { UpdateBusinessModelDto } from './dto/update-business_model.dto';

@Injectable()
export class BusinessModelService {
  create(createBusinessModelDto: CreateBusinessModelDto) {
    return 'This action adds a new businessModel';
  }

  findAll() {
    return `This action returns all businessModel`;
  }

  findOne(id: number) {
    return `This action returns a #${id} businessModel`;
  }

  update(id: number, updateBusinessModelDto: UpdateBusinessModelDto) {
    return `This action updates a #${id} businessModel`;
  }

  remove(id: number) {
    return `This action removes a #${id} businessModel`;
  }
}
