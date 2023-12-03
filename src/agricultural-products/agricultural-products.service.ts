import {Injectable} from '@nestjs/common';
import {AgriculturalProductsCreateDto} from "./dto/agricultural-products-create.dto";
import {StorageService} from "../storage/storage.service";
import {AgriculturalProducts} from "../common/entities/agricultural-products.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {ImagePath} from "../common/enum";
import {FarmService} from "../farm/farm.service";
import {Pagination} from "../common/pagination/pagination.dto";
import {Meta} from "../common/pagination/meta.dto";
import {PaginationModel} from "../common/pagination/pagination.model";
import {ApiException} from "../exception/api.exception";
import {ErrorMessages} from "../exception/error.code";
import {AgriculturalProductsUpdateDto} from "./dto/agricultural-products-update.dto";

@Injectable()
export class AgriculturalProductsService {


    constructor(
        @InjectRepository(AgriculturalProducts)
        private agriculturalProductsRepository: Repository<AgriculturalProducts>,
        private storageService: StorageService,
        private farmService: FarmService,
    ) {
    }

    async createAgriculturalProducts(dto: AgriculturalProductsCreateDto, images: Express.Multer.File[]) {
        const farm = await this.farmService.getFarmById(dto.farm);
        const imagesPath = images.length > 0 ? await this.storageService.uploadMultiFiles(ImagePath.CARD_AGRICULTURAL_PRODUCTS, images) : [];
        const agriculturalProducts = this.agriculturalProductsRepository.create({
            ...dto,
            farm,
            images: imagesPath
        });
        return await this.agriculturalProductsRepository.save(agriculturalProducts);
    }

    async getAgriculturalProductsPagination(pagination: Pagination) {
        const queryBuilder = this.agriculturalProductsRepository
            .createQueryBuilder("agriculturalProducts")
            .where("agriculturalProducts.name like :name", {name: `%${pagination.search || ''}%`})
            .leftJoinAndSelect("agriculturalProducts.farm", "farm")

            // lấy tất cả agriculturalProducts và farm chỉ cần name
            .select([
                "agriculturalProducts",
                "farm.name",
                'farm.id',
            ])
            .skip(pagination.skip)
            .take(pagination.take)
            .orderBy("agriculturalProducts.createdAt", pagination.order)


        const itemCount = await queryBuilder.getCount();
        const { entities } = await queryBuilder.getRawAndEntities();

        const meta = new Meta({ itemCount, pagination });
        return new PaginationModel(entities, meta);
    }


    async getAgriculturalProductsById(id: string) {
        const  agriculturalProducts  = await this.agriculturalProductsRepository.findOne({
            where: {
                id
            }
        })
        if (!agriculturalProducts) {
            throw new ApiException(ErrorMessages.AGRICULTURAL_PRODUCTS_NOT_FOUND);
        }
        return agriculturalProducts;
    }

    async deleteAgriculturalProductsById(id: string) {
        return await this.agriculturalProductsRepository.delete(id);
    }

    async updateAgriculturalProducts(id: string, dto: AgriculturalProductsUpdateDto, images: Express.Multer.File[]) {
        const agriculturalProducts = await this.getAgriculturalProductsById(id);

        const farm = dto.farmId ? await this.farmService.getFarmById(dto.farmId) : agriculturalProducts.farm;

        if (images.length > 0 && agriculturalProducts.images.length > 0)
            await this.storageService.deleteMultiFiles(agriculturalProducts.images);
        const imagesPath = images.length > 0 ? await this.storageService.uploadMultiFiles(ImagePath.CARD_AGRICULTURAL_PRODUCTS, images) : agriculturalProducts.images;

        const updateAgriculturalProducts = this.agriculturalProductsRepository.merge(agriculturalProducts, {
            ...dto,
            images: imagesPath,
            farm
        })

        return await this.agriculturalProductsRepository.save(updateAgriculturalProducts);
    }
}
