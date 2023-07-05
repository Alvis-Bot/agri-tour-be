import { Farm } from "../../common/entities/farm.entity";
import { FarmCreateDto } from "../../common/dto/farm-create.dto";
import { User } from "../../common/entities/user.entity";
import { QueryAllDto } from "../dto/query-all.dto";


export interface IFarmService {
  createFarm(dto: FarmCreateDto, user: User): Promise<Farm>;

  getFarmById(id: string): Promise<Farm>;

  getFarms(): Promise<Farm[]>;

  getFarmFetchLandAndArea(dto: QueryAllDto): Promise<Farm[]>;
}