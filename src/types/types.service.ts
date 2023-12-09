import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { TypeCreateDto } from './dto/type-create.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Type } from '../common/entities/type.entity';
import { QueryRunner, Repository } from 'typeorm';
import { ApiException } from "../exception/api.exception";
import { ErrorMessages } from "../exception/error.code";
//implements OnModuleInit
@Injectable()
export class TypesService {
  constructor(
    @InjectRepository(Type) private typeRepository: Repository<Type>
  ) {
  }

  async onModuleInit(): Promise<{ added: Type[], skipped: string[], errors: string[] }> {
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
      { name: 'NHOM_CAY_TRONG' },
      { name: 'NHOM_VAT_TU' },

    ];
    const addedTypes: Type[] = [];
    const skippedTypes: string[] = [];
    const errorMessages: string[] = [];
    const queryRunner: QueryRunner = this.typeRepository.manager.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      for (const type of types) {
        const existingType = await queryRunner.manager.findOne(Type, {
          where: {
            name: type.name,
          },
        });
        if (!existingType) {
          const newType = await queryRunner.manager.save(Type, type);
          addedTypes.push(newType);
          Logger.error(`Added new type: ${type.name}`);
        } else {
          skippedTypes.push(type.name);
          Logger.error(`Type already exists: ${type.name}`);
        }
      }

      await queryRunner.commitTransaction();
      return { added: addedTypes, skipped: skippedTypes, errors: errorMessages };
    } catch (error) {
      errorMessages.push(error.message);
      Logger.error(`Error during transaction: ${error}`);
      await queryRunner.rollbackTransaction();
      return { added: addedTypes, skipped: skippedTypes, errors: errorMessages };
    } finally {
      await queryRunner.release();
    }
  }


  // async onModuleInit(): Promise<void> {
  //   const types = [
  //     { name: 'TINH_THANH' },
  //     { name: 'QUAN_HUYEN' },
  //     { name: 'PHUONG_XA' },
  //     { name: 'LOAI_DAT' },
  //     { name: 'BUSINESS_TYPE' },
  //     { name: 'BUSINESS_MODEL' },
  //     { name: 'SOIL_TYPE' },
  //     { name: 'PRODUCT_TYPE' },
  //     { name: 'UNIT_TYPE' },
  //     { name: 'ROOT' },
  //     { name: 'KHACH_HANG' },
  //     { name: 'DOI_TUONG_KHAC' },
  //     { name: 'PROVIDER' },
  //     { name: 'NHOM_CAY_TRONG' },
  //     { name: 'NHOM_VAT_TU' },

  //   ];

  //   const itemsCount = await this.typeRepository.count();
  //   if (itemsCount > 0) return;
  //   await this.typeRepository.save(types);

  // }


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

  async deleteType(id: string): Promise<NonNullable<unknown> | any> {
    const type = await this.getTypeById(id);
    await this.typeRepository.remove(type);
    return {
      message: `Delete Type ${id} Successfully`
    }
  }

}
