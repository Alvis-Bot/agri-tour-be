import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { FarmCreateDto } from '../common/dto/farm-create.dto';
import { Farm } from '../common/entities/farm.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ILike, Repository, createQueryBuilder } from 'typeorm';
import { ApiException } from '../exception/api.exception';
import { QueryAllDto } from './dto/query-all.dto';
import { ErrorMessages } from '../exception/error.code';
import { User } from '../common/entities/user.entity';
import { MulterUtils } from '../common/utils/multer.utils';
import { PaginationModel } from 'src/common/pagination/pagination.model';
import { Pagination } from 'src/common/pagination/pagination.dto';
import { Meta } from 'src/common/pagination/meta.dto';
import { Response, response } from 'express';
import { UpdateFarmDTO } from 'src/common/dto/farm-update.dto';
import { isEmpty, isNotEmpty } from 'class-validator';

@Injectable()
export class FarmService {
  constructor(
    @InjectRepository(Farm) private farmRepository: Repository<Farm>,
  ) { }

  async createFarm(
    dto: FarmCreateDto,
    image: Express.Multer.File,
    myUser: User,
  ): Promise<Farm> {
    // kiểm tra name đã tồn tại chưa
    if (await this.existsFarmName(dto.name)) {
      throw new ApiException(ErrorMessages.FARM_ALREADY_EXIST);
    }
    // tạo farm
    const farmCreated = this.farmRepository.create({
      ...dto,
      image: image ? MulterUtils.convertPathToUrl(image.path) : null,
      user: myUser,
    });
    // lưu farm
    return await this.farmRepository.save(farmCreated);
  }



  async updateFarm(
    id: string,
    dto: UpdateFarmDTO,
    image: Express.Multer.File,
    myUser: User,
  ): Promise<Farm> {
    // kiểm tra name đã tồn tại chưa
    const farm = await this.getFarmById(id);

    if (image) {
      MulterUtils.deleteFile(farm.image); Logger.debug("Deleting...")

    }


    const merged = this.farmRepository.merge(farm, {
      ...dto,
      image: image ? MulterUtils.convertPathToUrl(image.path) : farm.image,
      user: myUser
    });

    return await this.farmRepository.save(merged);
  }

  async existsFarmName(name: string): Promise<boolean> {
    return await this.farmRepository.exist({ where: { name } });
  }

  async getFarmById(id: string): Promise<Farm> {
    const farm = await this.farmRepository
      .createQueryBuilder('farm')
      .where('farm.id = :id', { id })
      .getOne();
    if (!farm) {
      throw new ApiException(ErrorMessages.FARM_NOT_FOUND);
    }
    return farm;
  }

  async getFarms(pagination: Pagination): Promise<PaginationModel<Farm>> {
    const searchableFields: Array<keyof Farm> = [
      'name',
      'address',
      'district',
      'province',
      'phoneNumber',
      'wards',
      'region',
      'user_representative',
      'email'
    ];
    const queryBuilder = this.farmRepository.createQueryBuilder('farms')
      .take(pagination.take)
      .skip(pagination.skip)
      .orderBy('farms.createdAt', pagination.order)
      .where(searchableFields
        .map((field) => `farms.${field} ILIKE :search`)
        .join(' OR '),
        {
          search: `%${pagination.search || ''}%`,
        })

    const [entities, itemCount] = await queryBuilder.getManyAndCount();
    const meta = new Meta({ pagination, itemCount });
    return new PaginationModel<Farm>(entities, meta);
  }

  async getFarmFetchLandAndArea(dto: QueryAllDto): Promise<Farm[]> {
    return (
      this.farmRepository
        .createQueryBuilder('farm')
        .leftJoinAndSelect('farm.areas', 'area')
        .leftJoinAndSelect('area.lands', 'land')
        // nếu ko có farmId thì trả về tất cả farm
        .where(dto.farmId ? 'farm.id = :farmId' : '1=1', { farmId: dto.farmId })
        // nếu ko có areaId thì trả về tất cả area
        .andWhere(dto.areaId ? 'area.id = :areaId' : '1=1', {
          areaId: dto.areaId,
        })
        // nếu ko có landId thì trả về tất cả land
        .andWhere(dto.landId ? 'land.id = :landId' : '1=1', {
          landId: dto.landId,
        })
        .getMany()
    );
  }

  async getTotalFarm(): Promise<number> {
    return this.farmRepository.count();
  }

  async removeFarm(id: string): Promise<Object> {
    try {
      const farm = await this.getFarmById(id);
      if (farm) {
        MulterUtils.deleteFile(farm?.image);
      }
      await this.farmRepository.remove(farm);

      return {
        status: 200,
        message: 'Farm deleted successfully'
      }
    } catch (error) {
      throw new BadRequestException({
        message: error.message

      })
    }
  }
}
