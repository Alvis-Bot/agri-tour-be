import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Crop } from '../common/entities/crop.entity';
import { DataSource, Repository } from 'typeorm';
import { CropCreateDto } from './dto/crop-create.dto';
import { ApiException } from '../exception/api.exception';
import { ErrorMessages } from '../exception/error.code';
import { CategoryDetailsService } from '../category-details/category-details.service';
import { Meta } from '../common/pagination/meta.dto';
import { PaginationModel } from '../common/pagination/pagination.model';
import { Pagination } from '../common/pagination/pagination.dto';
import { MulterUtils } from '../common/utils/multer.utils';
import { DeleteResponse } from '../common/type';
import { CropDeleteImageDto, CropUpdateDto } from './dto/crop-update.dto';
import { isNotEmpty } from 'class-validator';

type Relations = 'workOfDays' | 'careSchedules' | 'harvests';

@Injectable()
export class CropsService {
  constructor(
    @InjectRepository(Crop) private cropRepository: Repository<Crop>,
    private readonly categoryDetailsService: CategoryDetailsService,
    @InjectDataSource()
    private dataSource: DataSource,
  ) {}

  async createCrop(
    dto: CropCreateDto,
    images: Express.Multer.File[],
  ): Promise<Crop> {
    // kiểm tra xem tên cây trồng đã tồn tại chưa

    if (await this.existsByName(dto.name)) {
      // lỗi thì xóa ảnh đã upload
      MulterUtils.deleteFiles(images.map((image) => image.path));
      throw new ApiException(ErrorMessages.CROP_EXISTED);
    }

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

  async existsByName(name: string): Promise<boolean> {
    return await this.cropRepository.exist({ where: { name } });
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
      .skip(pagination.skip)
      .orderBy('crop.createdAt', pagination.order);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const meta = new Meta({ itemCount, pagination });
    return new PaginationModel(entities, meta);
  }

  async deleteCrop(id: string): Promise<DeleteResponse> {
    const queryBuilder = this.cropRepository
      .createQueryBuilder()
      .delete()
      .from(Crop)
      .where('id = :id', { id })
      .returning(['images', 'id']);
    const result = await queryBuilder.execute();
    if (result.affected === 0) {
      throw new ApiException(ErrorMessages.CROP_NOT_FOUND);
    }
    result.raw[0].images.forEach((image: string) => {
      MulterUtils.deleteFile(image);
    });

    return {
      message: 'Delete successfully',
      id: result.raw[0].id,
    };
  }

  async updateCrop(
    cropId: string,
    dto: CropUpdateDto,
    // image: Express.Multer.File[],
  ) {
    const groupCrop =
      isNotEmpty(dto.groupCrop) &&
      (await this.categoryDetailsService.getDetailCategoryById(dto.groupCrop));

    const updateQueryBuilder = this.cropRepository
      .createQueryBuilder()
      .update(Crop)
      .set({
        ...dto,
        ...(groupCrop && { groupCrop }),
      })
      .where('id = :id', { id: cropId });
    const result = await updateQueryBuilder.execute();
    console.log(result);
    if (result.affected === 0) {
      throw new ApiException(ErrorMessages.CROP_NOT_FOUND);
    }

    const selectQueryBuilder = this.cropRepository
      .createQueryBuilder('crop')
      .leftJoinAndSelect('crop.groupCrop', 'groupCrop')
      .where('crop.id = :id', { id: cropId });
    return await selectQueryBuilder.getOne();
  }

  async updateCropImage(cropId: string, image: Express.Multer.File[]) {
    const crop = await this.getCropById(cropId);
    const images = MulterUtils.convertArrayPathToUrl(
      image.map((image) => image.path),
    );
    crop.images = [...crop.images, ...images];
    return await this.cropRepository.save(crop);
  }

  async deleteCropImage(cropId: string, dto: CropDeleteImageDto) {
    const crop = await this.getCropById(cropId);
    // xóa ảnh local
    MulterUtils.deleteFiles(dto.removeImages);

    // xóa ảnh trong db
    crop.images = crop.images.filter(
      (image) => !dto.removeImages.includes(image),
    );

    return await this.cropRepository.save(crop);
  }
}
