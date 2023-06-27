import { LandCreateDto } from "../../common/dto/land-create.dto";
import { Land } from "../../common/entities/land.entity";
import { Area } from "../../common/entities/area.entity";

export interface ILandService {

  createLand(dto: LandCreateDto, area: Area): Promise<Land>;

  getLands(): Promise<Land[]>;

  getLandsByAreaId(areaId: string) : Promise<Land[]>

  getLandById(id: string): Promise<Land>
}