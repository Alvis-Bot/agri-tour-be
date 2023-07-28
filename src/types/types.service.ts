import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Type } from './entities/type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TypesService {
  constructor(@InjectRepository(Type)
  private typeRepository: Repository<Type>
  ) {

  }
  async initData() {
    const types = [
      { name: 'TINH_THANH' },
      { name: 'QUAN_HUYEN' },
      { name: 'PHUONG_XA' },
      { name: 'LOAI_DAT' },
      { name: 'BUSINESS_TYPE' },
      { name: 'BUSINESS_MODEL' },
      { name: 'SOIL_TYPE' },
      { name: 'PRODUCT_TYPE' },
      { name: 'UNIT_TYPE' },
      { name: 'ROOT' },

    ];

    for (const type of types) {
      const existingType = await this.typeRepository.findOne({
        where: { name: type.name }
      });


      if (!existingType) {
        await this.typeRepository.save(this.typeRepository.create(type));
        return existingType;
      }

    }
  }
  create(createTypeDto: CreateTypeDto) {
    const creating = this.typeRepository.create(createTypeDto);
    return this.typeRepository.save(creating);
  }

  findAll() {
    return this.typeRepository.find({
      select: ['id', 'name']
    });
  }

  findOne(id: string) {
    const type = this.typeRepository.findOne({
      where: { id },
    });
    if (!type) throw new NotFoundException('No type found');
    return type
  }

  findOneByName(name: string) {
    const type = this.typeRepository.findOne({
      where: { name },
    });
    if (!type) throw new NotFoundException('No type found');
    return type
  }

  async update(id: string, dto: UpdateTypeDto): Promise<Type> {
    const type = await this.findOne(id);
    const merged = this.typeRepository.merge(type, dto);

    const updated = await this.typeRepository.update(id, merged);
    if (!updated) throw new BadRequestException({
      message: ['Update type failed']
    })
    return merged;
  }

  async deleteType(id: string): Promise<void | any> {
    const result = await this.typeRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException('Type not found');
    }
    return {
      message: ['Type deleted successfully']
    }
  }
}
