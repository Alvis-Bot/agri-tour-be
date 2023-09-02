import {Injectable} from '@nestjs/common';
import {Supplies} from "../common/entities/supplies.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {SuppliesCreateDto} from "./dto/supplies-create.dto";
import {StorageService} from "../storage/storage.service";
import {ImageType} from "../common/enum";
import {Pagination} from "../common/pagination/pagination.dto";
import {Meta} from "../common/pagination/meta.dto";
import {PaginationModel} from "../common/pagination/pagination.model";

@Injectable()
export class SuppliesService {

    constructor(
        @InjectRepository(Supplies)
        private suppliesRepository: Repository<Supplies>,
        private storageService: StorageService
    ) {}

    async createSupplies(dto: SuppliesCreateDto, images: Express.Multer.File[]) {
        const imagesPath = await this.storageService.uploadMultiFiles(ImageType.CARD_SUPPLIES,  images);
        const supplies = this.suppliesRepository.create({
            ...dto,
            images: imagesPath
        });
        return await this.suppliesRepository.save(supplies);
    }

    async getSuppliesPagination(pagination: Pagination) {
        const queryBuilder = this.suppliesRepository
            .createQueryBuilder("supplies")
            .skip(pagination.skip)
            .take(pagination.take)
            .orderBy("supplies.createdAt", pagination.order)

        const itemCount = await queryBuilder.getCount();
        const { entities } = await queryBuilder.getRawAndEntities();

        const meta = new Meta({ itemCount, pagination });
        return new PaginationModel(entities, meta);
    }

    async deleteSupplies(id: string) {
        return await this.suppliesRepository.delete(id);
    }

    async getSuppliesById(id: string) {
       return await this.suppliesRepository.findOne({
              where: {
                    id
              }
       });
    }
}
