import { ConflictException, Injectable ,Global} from "@nestjs/common";
import { AreaCreateDto } from "../common/dto/area-create.dto";
import { Area } from "../common/entities/area.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ApiException } from "../exception/api.exception";
import {ErrorMessages} from "../exception/error.code";
import {FarmService} from "../farm/farm.service";
@Global()
@Injectable()
export class AreaService  {

  constructor(@InjectRepository(Area) private areaRepository: Repository<Area>,
    private farmService: FarmService) { }

  async createArea(dto: AreaCreateDto, farmId: string): Promise<Area> {
      console.log(dto.avatars)
      const farm = await this.farmService.getFarmById(farmId);
      if (!farm) {
        throw new ApiException(ErrorMessages.FARM_NOT_FOUND)
      }
      const area = await this.areaRepository.findOne({
        where: {
          name: dto.name
        }
      })
      if (area) {
        throw new ConflictException("Đã tồn tại vùng canh tác này");
      }
      const areaEntity = this.areaRepository.create({
        ...dto,
        farm
      });
      return await this.areaRepository.save(areaEntity);

  }

  async getAreas(): Promise<Area[]> {
    return this.areaRepository
      .createQueryBuilder('area')
      .select([
        'area.id',
        'area.name',
        'area.locations',
        'area.description',
        'area.avatars',
        'area.acreage',
        'farm.id',
        'farm.name',
      ])
      .leftJoin('area.farm', 'farm')
      .getMany();
  }

  async getAreaById(id: string): Promise<Area> {
    const area = await this.areaRepository.
      createQueryBuilder('land')
      .where('land.id = :id', { id })
      .getOne();

    if (!area) {
      throw new ApiException(ErrorMessages.AREA_NOT_FOUND)
    }
    return area;
  }
  async uploadFile(file: Express.Multer.File[], areaId: string): Promise<Area> {
    const area = await this.areaRepository.
      createQueryBuilder('land')
      .where('land.id = :id', { id: areaId })
      .getOne();

    if (!area) {
      throw new ApiException(ErrorMessages.AREA_NOT_FOUND)
    }

    area.avatars = file.map((image) => image.filename);
    return this.areaRepository.save(area);
  }

  async getAreasByFarmId(farmId: string): Promise<Area[]> {
    await this.farmService.getFarmById(farmId);
    return this.areaRepository.
      createQueryBuilder('land')
      .where('land.farm_id = :farmId', { farmId })
      .getMany()
  }

  async getTotalArea() : Promise<number> {
    return this.areaRepository.count();
  }

}
