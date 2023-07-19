import { BadRequestException, ConflictException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { ILandService } from "./land";
import { InjectRepository } from "@nestjs/typeorm";
import { Area } from "../../common/entities/area.entity";
import { Int32, Repository } from "typeorm";
import { Service } from "../../common/enum/service";
import { IFarmService } from "../../farm/service/farm";
import { Land } from "../../common/entities/land.entity";
import { LandCreateDto } from "../../common/dto/land-create.dto";
import { ISoilTypeService } from "../../soil-type/service/soil-type";
import { ApiException } from "../../exception/api.exception";
import { ErrorCode } from "../../exception/error.code";
import { IAreaService } from "../../area/service/area";
import { UploadDto } from "../../area/dto/upload.dto";
import { UploadLandDto } from "../dto/upload-land.dto";
import * as fs from "fs";
import { isInt } from "class-validator";
import { Location as ILocation } from "src/common/interface";
@Injectable()
export class LandService implements ILandService {
  constructor(@InjectRepository(Land) private landRepository: Repository<Land>,
    @Inject(Service.SOIL_TYPE_SERVICE) private soilTypeService: ISoilTypeService,
    @Inject(Service.AREA_SERVICE) private areaService: IAreaService,
  ) { }
  async createLandCustom(areaId: string, dto: LandCreateDto): Promise<Land> {
    try {
      if (dto.locations.length > 0) {
        dto.locations.map((loc: ILocation) => {
          if (!Number.isInteger(loc.point)) {
            throw new BadRequestException(`Invalid location point ${loc.point} needs to be an integer`);
          }
        })
      }
      const area = await this.areaService.getAreaById(areaId);
      if (!area) {
        throw new NotFoundException("Khu vực này không tồn tại !")
      }
      const land = await this.landRepository.findOne({
        where: {
          name: dto.name
        }
      })
      if (area && land) {
        throw new ConflictException("Đã tồn tại vùng canh tác này");
      }
      const creating = this.landRepository.create({
        ...dto,
        area
      });
      return await this.landRepository.save(creating);
    }
    catch (error) {

      console.log("Create failed ! File deleting...");

      dto.images.map(image => {
        fs.unlinkSync(`public/${image}`);
      })
      console.log("Deleted!");

      throw new BadRequestException({
        message: [error.message]
      });
    }
  }

  async createLand(dto: LandCreateDto, area: Area): Promise<Land> {
    const soilType = await this.soilTypeService.getSoilTypeById(dto.soilTypeId);
    const areaEntity = this.landRepository.create({
      name: dto.name,
      soilType,
      area,
      locations: dto.locations
    });
    return this.landRepository.save(areaEntity);
  }

  async getLands(): Promise<Land[]> {
    return this.landRepository.
      createQueryBuilder('land')
      .leftJoinAndSelect('land.soilType', 'soilType')
      // .leftJoinAndSelect('land.area', 'area')
      .getMany();
  }

  async getLandsByAreaId(areaId: string): Promise<Land[]> {
    const area = await this.areaService.getAreaById(areaId);
    if (!area) {
      throw new ApiException(ErrorCode.AREA_NOT_FOUND)
    }
    return this.landRepository.
      createQueryBuilder('land')
      .where('land.areaId = :areaId', { areaId })
      .leftJoinAndSelect('land.soilType', 'soilType')
      .getMany();
  }

  async getLandById(id: string): Promise<Land> {
    const land = await this.landRepository.
      createQueryBuilder('land')
      .where('land.id = :id', { id })
      .leftJoinAndSelect('land.soilType', 'soilType')
      .getOne();

    if (!land) {
      throw new ApiException(ErrorCode.LAND_NOT_FOUND)
    }
    return land;
  }

  async uploadFile(landId: string, dto: UploadLandDto, files: Express.Multer.File[]) {
    const land = await this.getLandById(landId);
    land.images = files.map(file => file.filename);
    return this.landRepository.save(land);
  }
}
