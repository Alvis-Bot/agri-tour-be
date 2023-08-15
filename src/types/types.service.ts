import { Injectable, OnModuleInit } from '@nestjs/common';
import { TypeCreateDto } from './dto/type-create.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Type } from '../common/entities/type.entity';
import { Repository } from 'typeorm';
import { ApiException } from "../exception/api.exception";
import { ErrorMessages } from "../exception/error.code";

@Injectable()
export class TypesService implements OnModuleInit {
  constructor(
    @InjectRepository(Type) private typeRepository: Repository<Type>
  ) {
  }


  async onModuleInit(): Promise<void> {
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
      { name: 'KHACH_HANG' },
      { name: 'DOI_TUONG_KHAC' },
      { name: 'PROVIDER' },
    ];

    const itemsCount = await this.typeRepository.count();
    if (itemsCount > 0) return;
    await this.typeRepository.save(types);

  }


  async createType(dto: TypeCreateDto): Promise<Type> {
    // kiểm tra xem đã tồn tại chưa
    await this.existsByName(dto.name);
    const creating = this.typeRepository.create(dto);
    return this.typeRepository.save(creating);
  }


  async existsByName(name: string): Promise<void> {
    const existingType = await this.typeRepository.exist({ where: { name } });
    if (existingType) throw new ApiException(ErrorMessages.TYPE_EXISTED)
  }

  async getTypes(): Promise<Type[]> {
    return this.typeRepository.find({
      select: ['id', 'name']
    });
  }

  async getTypeById(id: string): Promise<Type> {
    const type = await this.typeRepository.findOne({ where: { id } });
    if (!type) throw new ApiException(ErrorMessages.TYPE_NOT_FOUND)
    return type
  }

  async getTypeByName(name: string): Promise<Type> {
    const type = await this.typeRepository.findOne({
      where: { name },
    });
    if (!type) throw new ApiException(ErrorMessages.TYPE_NOT_FOUND)
    return type
  }

  async updateType(id: string, dto: UpdateTypeDto): Promise<Type> {
    const type = await this.getTypeById(id);
    return this.typeRepository.save({
      ...type,
      ...dto
    });
  }

  async deleteType(id: string): Promise<Object | any> {
    const type = await this.getTypeById(id);
    await this.typeRepository.remove(type);
    return {
      message: `Delete Type ${id} Successfully`
    }
  }

}
