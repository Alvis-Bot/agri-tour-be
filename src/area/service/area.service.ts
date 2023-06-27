import { Inject, Injectable } from "@nestjs/common";
import { IAreaService } from "./area";
import { AreaCreateDto } from "../../common/dto/area-create.dto";
import { Area } from "../../common/entities/area.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ApiException } from "../../exception/api.exception";
import { ErrorCode } from "../../exception/error.code";
import { Service } from "../../common/enum/service";
import { IFarmService } from "../../farm/service/farm";

@Injectable()
export class AreaService implements IAreaService{

  constructor(@InjectRepository(Area) private areaRepository: Repository<Area>,
              @Inject(Service.FARM_SERVICE) private farmService: IFarmService) {}

  async createArea(dto: AreaCreateDto, farmId: string): Promise<Area> {
    const farm = await this.farmService.getFarmById(farmId);
    if (!farm) {
      throw new ApiException(ErrorCode.FARM_NOT_FOUND)
    }

    const areaEntity = this.areaRepository.create({
      name: dto.name,
      locations: dto.locations,
      description: dto.description,
      farm
    });
    return this.areaRepository.save(areaEntity);
  }

   async getAreas(): Promise<Area[]> {
    return this.areaRepository.
        createQueryBuilder('land')
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
