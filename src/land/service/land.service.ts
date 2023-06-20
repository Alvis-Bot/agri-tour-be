import { Inject, Injectable } from "@nestjs/common";
import { ILandService } from "./land";
import { InjectRepository } from "@nestjs/typeorm";
import { Area } from "../../common/entities/area.entity";
import { Repository } from "typeorm";
import { AreaLocation, LandLocation } from "../../common/entities/location.entity";
import { Service } from "../../common/enum/service";
import { IFarmService } from "../../farm/service/farm";
import { Land } from "../../common/entities/land.entity";
import { LandCreateDto } from "../../common/dto/land-create.dto";
import { ISoilTypeService } from "../../soil-type/service/soil-type";
import { ApiException } from "../../exception/api.exception";
import { ErrorCode } from "../../exception/error.code";
import { IAreaService } from "../../area/service/area";

@Injectable()
export class LandService implements ILandService{
  constructor(@InjectRepository(Land) private landRepository: Repository<Land>,
              @InjectRepository(LandLocation) private landLocationRepository: Repository<LandLocation> ,
              @Inject(Service.SOIL_TYPE_SERVICE) private soilTypeService: ISoilTypeService,
              @Inject(Service.AREA_SERVICE) private areaService: IAreaService,
              ) {}

  async createLand(dto: LandCreateDto, areaId: string, soilTypeId: string): Promise<Land> {
    const soilType = await this.soilTypeService.getSoilTypeById(soilTypeId)
    if (!soilType) throw new ApiException(ErrorCode.AREA_NOT_FOUND)
    const area = await this.areaService.getAreaById(areaId)
    if (!area) throw new ApiException(ErrorCode.AREA_NOT_FOUND)
    const locations = dto.locations.map(async point => {
      const locationEntity = this.landLocationRepository.create({
           type: point.type,
           coordinates : point.coordinates
      });
      return await this.landLocationRepository.save(locationEntity);
    })

    console.log(locations)

    const areaEntity = this.landRepository.create({
      name: dto.name,
      locations: await Promise.all(locations),
      soilType: soilType,
     area: area
    });
    return this.landRepository.save(areaEntity);
  }
}
