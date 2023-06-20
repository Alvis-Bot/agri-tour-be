import { Injectable } from '@nestjs/common';
import { IFeatureService } from "./feature";
import { InjectRepository } from "@nestjs/typeorm";
import { Group } from "../../common/entities/group.entity";
import { Repository } from "typeorm";
import { PermissionService } from "../../permission/permission.service";
import { Feature } from "../../common/entities/feature.entity";
import { CreateFeatureDto } from "../../common/dto/create-feature.dto";

@Injectable()
export class FeatureService implements IFeatureService{

  constructor(@InjectRepository(Feature) private groupRepository: Repository<Feature>) {}
  async createFeature(dto: CreateFeatureDto): Promise<void> {
    const createdFeature = await this.groupRepository.create(dto);
    await this.groupRepository.save(createdFeature);
  }

  async getFeatures(): Promise<Feature[]> {
    return await this.groupRepository.find()
  }

  async selectCodesFeature(): Promise<string[]> {
    const   features = await this.groupRepository
      . createQueryBuilder("feature")
      .select("feature.code")
      .getMany();
    return features.map(({ code }) => code);
  }

}

export interface ISelectCodesFeature {
  code: string;
}
