import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {SoilType} from "../../common/entities/soil-type.entity";
import {Repository} from "typeorm";
import {ISoilTypeService} from "./soil-type";
import {ApiException} from "../../exception/api.exception";
import {ErrorMessages} from "../../exception/error.code";

@Injectable()
export class SoilTypeService implements ISoilTypeService{
   constructor(@InjectRepository(SoilType) private soilTypeRepository: Repository<SoilType>) {}

  async getSoilTypes(): Promise<SoilType[]> {
    return this.soilTypeRepository.find();
  }

  async getSoilTypeById(id: string): Promise<SoilType> {
      const soilType = await this.soilTypeRepository.findOneBy({id});
      if (!soilType) throw new ApiException(ErrorMessages.SOIL_TYPE_NOT_FOUND)
      return soilType;
  }

  async createSoilType(name: string): Promise<SoilType> {
    const soilType = this.soilTypeRepository.create({
      name
    });
    return this.soilTypeRepository.save(soilType);
  }
}
