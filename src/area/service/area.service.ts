import { BadRequestException, ConflictException, Inject, Injectable } from "@nestjs/common";
import { IAreaService } from "./area";
import { AreaCreateDto } from "../../common/dto/area-create.dto";
import { Area } from "../../common/entities/area.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ApiException } from "../../exception/api.exception";
import { ErrorCode } from "../../exception/error.code";
import { Service } from "../../common/enum/service";
import { IFarmService } from "../../farm/service/farm";
import * as fs from "fs";
@Injectable()
export class AreaService implements IAreaService {

  constructor(@InjectRepository(Area) private areaRepository: Repository<Area>,
    @Inject(Service.FARM_SERVICE) private farmService: IFarmService) { }

  async createArea(dto: AreaCreateDto, farmId: string): Promise<Area> {
    try {
      console.log(dto.avatars)
      const farm = await this.farmService.getFarmById(farmId);
      if (!farm) {
        throw new ApiException(ErrorCode.FARM_NOT_FOUND)
      }
      const area = await this.areaRepository.findOne({
        where: {
          name: dto.name
        }
      })
      if (area) {
        throw new ConflictException("Đã tồn tại vùng canh tác này");
      }
      const areaEntity = this.areaRepository.create({
        ...dto,
        farm
      });
      return await this.areaRepository.save(areaEntity);

    }
    catch (error) {
      console.log("Create failed ! File deleting...");

      dto.avatars.map(image => {
        fs.unlinkSync(`public/${image}`);
      })
      console.log("Deleted!");

      throw new BadRequestException({
        message: [error.message],
      })
    }
  }

  async getAreas(): Promise<Area[]> {
    return this.areaRepository
      .createQueryBuilder('area')
      .select([
        'area.id',
        'area.name',
        'area.locations',
        'area.description',
        'area.acreage',
        'farm.id',
        'farm.name',
      ])
      .leftJoin('area.farm', 'farm')
      .getMany();
  }

  async getAreaById(id: string): Promise<Area> {
    const area = await this.areaRepository.
      createQueryBuilder('land')
      .where('land.id = :id', { id })
      .getOne();

    if (!area) {
      throw new ApiException(ErrorCode.AREA_NOT_FOUND)
    }
    return area;
  }
  async uploadFile(file: Express.Multer.File[], areaId: string): Promise<Area> {
    const area = await this.areaRepository.
      createQueryBuilder('land')
      .where('land.id = :id', { id: areaId })
      .getOne();

    if (!area) {
      throw new ApiException(ErrorCode.AREA_NOT_FOUND)
    }

    area.avatars = file.map((image) => image.filename);
    return this.areaRepository.save(area);
  }

  async getAreasByFarmId(farmId: string): Promise<Area[]> {
    await this.farmService.getFarmById(farmId);
    return this.areaRepository.
      createQueryBuilder('land')
      .where('land.farm_id = :farmId', { farmId })
      .getMany()
  }

}
