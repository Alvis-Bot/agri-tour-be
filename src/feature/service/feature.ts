import { CreateFeatureDto } from "../../common/dto/create-feature.dto";
import { Feature } from "../../common/entities/feature.entity";
import { ISelectCodesFeature } from "./feature.service";


export interface IFeatureService {
    createFeature(dto: CreateFeatureDto): Promise<void>

    getFeatures(): Promise<Feature[]>;

    selectCodesFeature(): Promise<string[]>;
}