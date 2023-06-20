import { LandCreateDto } from "../../common/dto/land-create.dto";
import { Land } from "../../common/entities/land.entity";

export interface ILandService {

  createLand(dto: LandCreateDto, areaId: string, soilTypeId: string): Promise<Land>;
}