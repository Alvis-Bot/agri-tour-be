import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Land} from "../common/entities/land.entity";
import {LandCreateDto} from "../common/dto/land-create.dto";
import {ApiException} from "../exception/api.exception";
import {CategoryDetails} from "src/common/entities/category-detail.entity";
import {ErrorMessages} from "../exception/error.code";
import {StorageService} from "../storage/storage.service";
import {ImageType} from "../common/enum";
import {Transactional} from "typeorm-transactional";
import {CategoryName} from "../common/enum/category";
import {AreaService} from "../area/area.service";

@Injectable()
export class LandService {
  constructor(
    @InjectRepository(Land) private landRepository: Repository<Land>,
    private areaService: AreaService,
    private storageService: StorageService,
    @InjectRepository(CategoryDetails) private categoryDetailRepository: Repository<CategoryDetails>
  ) { }


  async getLandByName(name: string): Promise<Land> {
    const land = await this.landRepository.findOne({
      where: {
        name
      }
    })
    if (!land) {
      throw new ApiException(ErrorMessages.LAND_NOT_FOUND)
    }
    return land;
  }

  @Transactional()
  async createLand(areaId: string, dto: LandCreateDto, files: Express.Multer.File[]): Promise<any> {
    const area = await this.areaService.getAreaById(areaId);
    const productType = await this.getCategoryDetailById(dto.productTypeId, CategoryName.PRODUCT_NAME);
    const soilType = await this.getCategoryDetailById(dto.soilTypeId, CategoryName.SOIL_NAME);
    const check = await this.existLandByName(dto.name);
    if (check) throw new ApiException(ErrorMessages.LAND_EXIST);
    const imageName = await this.storageService.uploadMultiFiles(ImageType.CARD_LAND, files);

    const creating = this.landRepository.create({
      ...dto,
      area,
      soilType,
      productType,
      images: imageName
    })
    return await this.landRepository.save(creating);
  }

  async existLandByName(name: string): Promise<boolean> {
    return await this.landRepository.exist({
      where: {name}
    });
  }

  async getCategoryDetailById(id: string, type: CategoryName): Promise<CategoryDetails> {
    const categoryDetail = await this.categoryDetailRepository.createQueryBuilder('categoryDetail')
      .where('categoryDetail.id = :id', { id })
      .leftJoin('categoryDetail.category', 'category')
      .getOne();
    if (!categoryDetail) {
      throw new ApiException(ErrorMessages.CATEGORY_DETAIL_NOT_FOUND)
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
    return this.landRepository.
      createQueryBuilder('land')
      .where('land.areaId = :areaId', { areaId })
      .leftJoinAndSelect('land.soilType', 'soilType')
      .leftJoinAndSelect('land.productType', 'productType')
      .getMany();
  }

  async getLandById(id: string): Promise<Land> {
    const land = await this.landRepository.
      createQueryBuilder('land')
      .where('land.id = :id', { id })
      .leftJoinAndSelect('land.soilType', 'soilType')
      .leftJoinAndSelect('land.productType', 'productType')
      .getOne();
    if (!land) {
      throw new ApiException(ErrorMessages.LAND_NOT_FOUND)
    }
    return land;
  }


}
