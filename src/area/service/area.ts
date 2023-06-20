import { AreaCreateDto } from "../../common/dto/area-create.dto";
import { Area } from "../../common/entities/area.entity";


export interface IAreaService {

  createArea(dto: AreaCreateDto, farmId: string): Promise<Area>;

  getAreas(): Promise<Area[]>;

  getAreaById(id: string): Promise<Area>;
}