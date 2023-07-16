import { Injectable } from '@nestjs/common';
import { CreateBusinessTypeDto } from './dto/create-business_type.dto';
import { UpdateBusinessTypeDto } from './dto/update-business_type.dto';

@Injectable()
export class BusinessTypeService {
  create(createBusinessTypeDto: CreateBusinessTypeDto) {
    return 'This action adds a new businessType';
  }

  findAll() {
    return `This action returns all businessType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} businessType`;
  }

  update(id: number, updateBusinessTypeDto: UpdateBusinessTypeDto) {
    return `This action updates a #${id} businessType`;
  }

  remove(id: number) {
    return `This action removes a #${id} businessType`;
  }
}
