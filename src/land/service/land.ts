import { LandCreateDto } from "../../common/dto/land-create.dto";
import { Land } from "../../common/entities/land.entity";
import { Area } from "../../common/entities/area.entity";
import { UploadDto } from "../../area/dto/upload.dto";
import { UploadLandDto } from "../dto/upload-land.dto";

export interface ILandService {
  createLandCustom(areaId: string, dto: LandCreateDto): Promise<Land>;

  createLand(dto: LandCreateDto, area: Area): Promise<Land>;

  getLands(): Promise<Land[]>;

  getLandsByAreaId(areaId: string): Promise<Land[]>

  getLandById(id: string): Promise<Land>

  getLandByIdNoRelation(id: string): Promise<Land>


}