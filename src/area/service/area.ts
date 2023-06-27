import { AreaCreateDto } from "../../common/dto/area-create.dto";
import { Area } from "../../common/entities/area.entity";


export interface IAreaService {

  createArea(dto: AreaCreateDto, farmId: string): Promise<Area>;
  getAreas(): Promise<Area[]>;
  getAreaById(id: string): Promise<Area>;
  uploadFile(file: Express.Multer.File[], areaId: string): Promise<Area>;
  getAreasByFarmId(farmId: string): Promise<Area[]>
}