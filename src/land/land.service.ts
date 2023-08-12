import {BadRequestException, ConflictException, Inject, Injectable, NotFoundException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Service} from "../common/enum/service";
import {Land} from "../common/entities/land.entity";
import {LandCreateDto} from "../common/dto/land-create.dto";
import {ApiException} from "../exception/api.exception";
import {IAreaService} from "../area/service/area";
import * as fs from "fs";
import {CategoryDetails} from "src/common/entities/category-detail.entity";
import {ErrorMessages} from "../exception/error.code";

@Injectable()
export class LandService {
  constructor(
    @InjectRepository(Land) private landRepository: Repository<Land>,
    @Inject(Service.AREA_SERVICE) private areaService: IAreaService,
    @InjectRepository(CategoryDetails) private categoryDetailRepository: Repository<CategoryDetails>
  ) { }

  async createLandCustom(areaId: string, dto: LandCreateDto): Promise<Land> {
    try {

      const area = await this.areaService.getAreaById(areaId);
      if (!area) {
        throw new NotFoundException("Khu vực này không tồn tại !")
      }
      const land = await this.landRepository.findOne({
        where: {
          name: dto.name
        }
      })
      const productType = await this.findOneByCategoryDetail(dto.productTypeId, "loại sản phẩm");
      const soilType = await this.findOneByCategoryDetail(dto.soilTypeId, "loại đất");

      if (area && land) {
        throw new ConflictException("Đã tồn tại vùng canh tác này");
      }
      const creating = this.landRepository.create({
        ...dto,
        area,
        soilType,
        productType
      });
      return await this.landRepository.save(creating);
    }
    catch (error) {

      console.log("Create failed ! File deleting...");

      dto.images.map(image => {
        fs.unlinkSync(`public/${image}`);
      })
      console.log("Deleted!");

      throw new BadRequestException({
        message: [error.message]
      });
    }
  }
  async findOneByCategoryDetail(id: string, type?: string): Promise<CategoryDetails> {
    const categoryDetail = await this.categoryDetailRepository.findOne({
      where: { id }
    })
    if (!categoryDetail) {
      throw new NotFoundException(`Không tìm thấy  ${type} ! ${type}  Not Found`)
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
