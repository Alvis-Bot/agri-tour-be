import { AreaCreateDto } from "../../common/dto/area-create.dto";
import { Land } from "../../common/entities/area.entity";


export interface ILandService {

  createLand(dto: AreaCreateDto): Promise<Land>;

  getLands(): Promise<Land[]>;

  getLandById(id: string): Promise<Land>;
}