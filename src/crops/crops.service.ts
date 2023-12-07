import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Crop } from '../common/entities/crop.entity';
import { Repository } from 'typeorm';
import { CropCreateDto } from './dto/crop-create.dto';
import { ApiException } from '../exception/api.exception';
import { ErrorMessages } from '../exception/error.code';
import { StorageService } from '../storage/storage.service';
import { CategoryDetailsService } from '../category-details/category-details.service';
import { Meta } from '../common/pagination/meta.dto';
import { PaginationModel } from '../common/pagination/pagination.model';
import { Pagination } from '../common/pagination/pagination.dto';
import { MulterUtils } from '../common/utils/multer.utils';

type Relations = 'workOfDays' | 'careSchedules' | 'harvests';

@Injectable()
export class CropsService {
  constructor(
    @InjectRepository(Crop) private cropRepository: Repository<Crop>,
    private readonly storageService: StorageService,
    private readonly categoryDetailsService: CategoryDetailsService,
  ) {}

  async createCrop(
    dto: CropCreateDto,
    images: Express.Multer.File[],
  ): Promise<Crop> {
    // kiểm tra xem tên cây trồng đã tồn tại chưa
    await this.existsByName(dto.name);

    const groupCrop = await this.categoryDetailsService.getDetailCategoryById(
      dto.groupCrop,
    );

    const crop = this.cropRepository.create({
      ...dto,
      groupCrop,
      images: MulterUtils.convertArrayPathToUrl(
        images.map((image) => image.path),
      ),
    });
    return await this.cropRepository.save(crop);
  }

  async getRelationByCropId(id: string, relations: Relations): Promise<Crop> {
    const data = await this.cropRepository.findOne({
      where: { id },
      relations: [relations],
    });
    if (!data) throw new ApiException(ErrorMessages.CROP_NOT_FOUND);
    return data;
  }

  async existsByName(name: string): Promise<void> {
    const existingCrop = await this.cropRepository.exist({ where: { name } });
    if (existingCrop) throw new ApiException(ErrorMessages.CROP_EXISTED);
  }

  async getCropById(id: string): Promise<Crop> {
    const crop = await this.cropRepository.findOne({
      where: {
        id,
      },
    });
    if (!crop) throw new ApiException(ErrorMessages.CROP_NOT_FOUND);
    return crop;
  }

  async getCropsPagination(pagination: Pagination) {
    const queryBuilder = this.cropRepository
      .createQueryBuilder('crop')
      .leftJoinAndSelect('crop.groupCrop', 'groupCrop')
      .orderBy('crop.createdAt')
      .where('crop.name ILIKE :name', {
        name: `%${pagination.search || ''}%`,
      })
      .take(pagination.take)
      .skip(pagination.skip);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const meta = new Meta({ itemCount, pagination });
    return new PaginationModel(entities, meta);
  }
}
