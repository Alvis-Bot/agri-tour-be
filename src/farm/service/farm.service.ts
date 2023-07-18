import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { IFarmService } from "./farm";
import { FarmCreateDto } from "../../common/dto/farm-create.dto";
import { Farm } from "../../common/entities/farm.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../common/entities/user.entity";
import { Repository } from "typeorm";
import { ApiException } from "../../exception/api.exception";
import { ErrorCode } from "../../exception/error.code";
import { QueryAllDto } from "../dto/query-all.dto";
import * as fs from "fs";
@Injectable()
export class FarmService implements IFarmService {

  constructor(@InjectRepository(Farm) private farmRepository: Repository<Farm>,
    @InjectRepository(User) private userRepository: Repository<User>
  ) { }

  async createFarm(dto: FarmCreateDto): Promise<Farm | any> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: dto.userId },
        select: ['id', 'fullName', 'username'],
      })
      if (!user) {
        throw new NotFoundException();
      }
      const farm = await this.getFarmByName(dto.name);
      if (farm) {
        throw new ConflictException("Farm already exists")
      }


      const farmEntity = this.farmRepository.create({
        ...dto,
        
        user
      });
      return await this.farmRepository.save(farmEntity);

    }
    catch (error) {

      console.log("Create failed ! File deleting...");
      fs.unlinkSync(`public/${dto.image}`);
      console.log("Deleted!");

      throw new BadRequestException(error.message)
    }

  }
  async getFarmByName(name: string): Promise<Farm> {
    const farm = await this.farmRepository.findOne({
      where: { name },
    })

    return farm;
  }
  async getFarmById(id: string): Promise<Farm> {
    const farm = await this.farmRepository
      .createQueryBuilder("farm")
      .where("farm.id = :id", { id })
      .getOne();
    if (!farm) {
      throw new ApiException(ErrorCode.FARM_NOT_FOUND);
    }
    return farm;
  }

  async getFarms(): Promise<Farm[]> {
    return this.farmRepository.find();
  }

  async getFarmFetchLandAndArea(dto: QueryAllDto): Promise<Farm[]> {
    return this.farmRepository
      .createQueryBuilder("farm")
      .leftJoinAndSelect("farm.areas", "area")
      .leftJoinAndSelect("area.lands", "land")
      // nếu ko có farmId thì trả về tất cả farm
      .where(dto.farmId ? "farm.id = :farmId" : "1=1", { farmId: dto.farmId })
      // nếu ko có areaId thì trả về tất cả area
      .andWhere(dto.areaId ? "area.id = :areaId" : "1=1", { areaId: dto.areaId })
      // nếu ko có landId thì trả về tất cả land
      .andWhere(dto.landId ? "land.id = :landId" : "1=1", { landId: dto.landId })
      .getMany();
  }

}
