import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Crop } from "../common/entities/crop.entity";
import { Repository } from "typeorm";
import { CropCreateDto } from "./dto/crop-create.dto";
import { ApiException } from "../exception/api.exception";
import { ErrorMessages } from "../exception/error.code";
import { StorageService } from "../storage/storage.service";
import { ImageType } from "../common/enum";
import { CategoryDetails } from "../common/entities/category-detail.entity";
import { CategoryDetailsService } from "../category-details/category-details.service";
import { Meta } from "../common/pagination/meta.dto";
import { PaginationModel } from "../common/pagination/pagination.model";
import { Pagination } from "../common/pagination/pagination.dto";
import { ApiNotFoundResponse } from '@nestjs/swagger';
type Relations = "workOfDays" | "careSchedules" | "harvests"

@Injectable()
export class CropsService {
    constructor(
        @InjectRepository(Crop) private cropRepository: Repository<Crop>,
        private readonly storageService: StorageService,
        private readonly categoryDetailsService: CategoryDetailsService
    ) {
    }

    async createCrop(dto: CropCreateDto, images: Express.Multer.File[]): Promise<Crop> {

        // kiểm tra xem tên cây trồng đã tồn tại chưa
        await this.existsByName(dto.name)

        const groupCrop = await this.categoryDetailsService.getDetailCategoryById(dto.groupCrop)


        // upload ảnh
        const imageCrop = await this.storageService.uploadMultiFiles(ImageType.CARD_CROP, images)

        const crop = this.cropRepository.create({
            ...dto,
            groupCrop,
            images: imageCrop
        });
        return await this.cropRepository.save(crop);
    }
    async getRelationByCropId(cropId: string, relations: Relations): Promise<Crop> {
        const data = await this.cropRepository.findOne({
            where: { id: cropId },
            relations: [relations]
        })
        if (!data) throw new ApiException(ErrorMessages.CROP_NOT_FOUND);
        return data
    }
    async existsByName(name: string): Promise<void> {
        const existingCrop = await this.cropRepository.exist({ where: { name } });
        if (existingCrop) throw new ApiException(ErrorMessages.CROP_EXISTED)
    }
    async getCropById(id: string): Promise<Crop> {
        const crop = await this.cropRepository.findOne({
            where: {
                id
            }
        })
        if (!crop) throw new ApiException(ErrorMessages.CROP_NOT_FOUND);
        return crop
    }
    async getCropsPagination(pagination: Pagination) {
        const queryBuilder = this.cropRepository
            .createQueryBuilder("crop")
            // nếu name null thì trả về tất cả
            .where('crop.name like :name', { name: `%${pagination.search || ''}%` })
            .leftJoinAndSelect("crop.groupCrop", "groupCrop")
            .orderBy("crop.createdAt")
            .take(pagination.take)
            .skip(pagination.skip)

        const itemCount = await queryBuilder.getCount();
        const { entities } = await queryBuilder.getRawAndEntities();

        const meta = new Meta({ itemCount, pagination });
        return new PaginationModel(entities, meta);
    }
}
