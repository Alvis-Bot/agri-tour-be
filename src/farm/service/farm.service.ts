import { Injectable } from '@nestjs/common';
import { IFarmService } from "./farm";
import { FarmCreateDto } from "../../common/dto/farm-create.dto";
import { Farm } from "../../common/entities/farm.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../common/entities/user.entity";
import { Repository } from "typeorm";
import { ApiException } from "../../exception/api.exception";
import { ErrorCode } from "../../exception/error.code";

@Injectable()
export class FarmService implements IFarmService{

  constructor(@InjectRepository(Farm) private farmRepository: Repository<Farm>) {}

  async createFarm(dto: FarmCreateDto, user: User): Promise<Farm> {
    const farmEntity = this.farmRepository.create({
      ...dto,
      user
    });
    return this.farmRepository.save(farmEntity);
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

}
