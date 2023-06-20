import { SoilType } from "../../common/entities/soil-type.entity";


export interface ISoilTypeService {

  createSoilType(name: string): Promise<SoilType>;

  getSoilTypes(): Promise<SoilType[]>;

  getSoilTypeById(id: string): Promise<SoilType>;

}