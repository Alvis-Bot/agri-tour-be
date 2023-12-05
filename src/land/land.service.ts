import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Land } from '../common/entities/land.entity';
import { LandCreateDto } from '../common/dto/land-create.dto';
import { ApiException } from '../exception/api.exception';
import { CategoryDetails } from 'src/common/entities/category-detail.entity';
import { ErrorMessages } from '../exception/error.code';
import { StorageService } from '../storage/storage.service';
import { Transactional } from 'typeorm-transactional';
import { CategoryName } from '../common/enum/category';
import { AreaService } from '../area/area.service';
import { UploadLandDto } from './dto/upload-land.dto';
import { MulterUtils } from '../common/utils/multer.utils';

@Injectable()
export class LandService {
  constructor(
    @InjectRepository(Land) private landRepository: Repository<Land>,
    private areaService: AreaService,
    private storageService: StorageService,
    @InjectRepository(CategoryDetails)
    private categoryDetailRepository: Repository<CategoryDetails>,
  ) {}

  async getLandByName(name: string): Promise<Land> {
    const land = await this.landRepository.findOne({
      where: {
        name,
      },
    });
    if (!land) {
      throw new ApiException(ErrorMessages.LAND_NOT_FOUND);
    }
    return land;
  }

  @Transactional()
  async createLand(
    areaId: string,
    dto: LandCreateDto,
    files: Express.Multer.File[],
  ): Promise<any> {
    // kiểm tra xem area có tồn tại không
    const area = await this.areaService.getAreaById(areaId);

    // kiểm tra xem productType và soilType có tồn tại không
    const productType = await this.getCategoryDetailById(
      dto.productTypeId,
      CategoryName.PRODUCT_NAME,
    );
    const soilType = await this.getCategoryDetailById(
      dto.soilTypeId,
      CategoryName.SOIL_NAME,
    );

    const isLand = await this.existLandByName(dto.name);
    if (isLand) throw new ApiException(ErrorMessages.LAND_EXIST);

    const creating = this.landRepository.create({
      ...dto,
      area,
      soilType,
      productType,
      images: MulterUtils.convertArrayPathToUrl(files.map((file) => file.path)),
    });
    return await this.landRepository.save(creating);
  }

  async existLandByName(name: string): Promise<boolean> {
    return await this.landRepository.exist({
      where: { name },
    });
  }

  async getCategoryDetailById(
    id: string,
    type: CategoryName,
  ): Promise<CategoryDetails> {
    const categoryDetail = await this.categoryDetailRepository
      .createQueryBuilder('categoryDetail')
      .where('categoryDetail.id = :id', { id })
      .andWhere('category.name = :type', { type })
      .leftJoin('categoryDetail.category', 'category')
      .getOne();
    if (!categoryDetail) {
      throw new ApiException(ErrorMessages.CATEGORY_DETAIL_NOT_FOUND);
    }
    return categoryDetail;
  }

  async getLands(): Promise<any[]> {
    // If you want to map the raw results to the Land entity, you can do it here
    // For example, if you have a map function to convert the raw results to Land entity, you can use it like:
    // const mappedLands = lands.map((rawLand) => this.mapRawLandToEntity(rawLand));
    // return mappedLands;

    return await this.landRepository
      .createQueryBuilder('land')
      .select([
        'land.id',
        'land.name',
        'land.acreage',
        'land.locations',
        'land.images',
        'area.id',
        'area.name',
        'soilType.id',
        'soilType.name',
        'productType.id',
        'productType.name',
        'productType.child_column',
      ])
      .leftJoin('land.area', 'area')
      .leftJoin('land.productType', 'productType')
      .leftJoin('land.soilType', 'soilType')
      .getMany();
  }

  async getLandsByAreaId(areaId: string): Promise<Land[]> {
    await this.areaService.getAreaById(areaId);
    return this.landRepository
      .createQueryBuilder('land')
      .where('land.areaId = :areaId', { areaId })
      .leftJoinAndSelect('land.soilType', 'soilType')
      .leftJoinAndSelect('land.productType', 'productType')
      .getMany();
  }

  async getLandById(id: string): Promise<Land> {
    const land = await this.landRepository
      .createQueryBuilder('land')
      .where('land.id = :id', { id })
      .leftJoinAndSelect('land.soilType', 'soilType')
      .leftJoinAndSelect('land.productType', 'productType')
      .getOne();
    if (!land) {
      throw new ApiException(ErrorMessages.LAND_NOT_FOUND);
    }
    return land;
  }

  async getTotalLand(): Promise<number> {
    return this.landRepository.count();
  }

  /**
   * Upload ảnh lên server
   *
   * @static
   * @param {string} landId // // 👈 Id của land
   * @param {UploadLandDto} dto // 👈 là mảng tên ảnh cũ
   * @param {Express.Multer.File[]} images // 👈 là mảng ảnh mới
   * @return {Promise<Land>} // 👈 trả về land đã được lưu
   * @memberof LandService
   */
  async uploadImage(
    landId: string,
    dto: UploadLandDto,
    images: Express.Multer.File[],
  ): Promise<Land> {
    const land = await this.getLandById(landId);
    // kiểm tra tên anh có trùng không
    const isImages = land.images.some((image) => dto.fileNames.includes(image));
    if (!isImages) {
      // vì multer đã lưu ảnh vào thư mục trước khi vào controller nên phải xóa ảnh đi nếu không sẽ bị rác
      const deleteImages = MulterUtils.convertArrayPathToUrl(
        images.map((image) => image.path),
      );
      await Promise.all(
        deleteImages.map((image) => MulterUtils.deleteFile(image)),
      );
      throw new ApiException(ErrorMessages.IMAGE_NOT_FOUND);
    }
    // xóa ảnh cũ đi
    await Promise.all(
      dto.fileNames.map((fileName) => MulterUtils.deleteFile(fileName)),
    );
    land.images = land.images
      // xóa ảnh cũ đi
      .filter((image) => !dto.fileNames.includes(image))
      // thêm ảnh mới vào
      // path cover url
      .concat(MulterUtils.convertArrayPathToUrl(images.map((image) => image.path)));
    console.log(land.images);

    return await this.landRepository.save(land);
  }
}
