import {Injectable} from '@nestjs/common';
import {IngredientsCreateDto} from "./dto/ingredients-create.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Ingredient} from "../common/entities/ingredient.entity";
import {StorageService} from "../storage/storage.service";
import {ImagePath} from "../common/enum";
import {Transactional} from "typeorm-transactional";
import {Pagination} from "../common/pagination/pagination.dto";
import {Meta} from "../common/pagination/meta.dto";
import {PaginationModel} from "../common/pagination/pagination.model";
import {ApiException} from "../exception/api.exception";
import {ErrorMessages} from "../exception/error.code";

@Injectable()
export class IngredientsService {

    constructor(
       @InjectRepository(Ingredient)
         private ingredientRepository: Repository<Ingredient>,
        private storageService: StorageService
    ) {}


    @Transactional()
    async createIngredient(dto: IngredientsCreateDto, images: Express.Multer.File[]) {
        const imagesPath = await this.storageService.uploadMultiFiles(ImagePath.CARD_INGREDIENTS,  images);
        const ingredient = this.ingredientRepository.create({
            ...dto,
            images: imagesPath
        });
        return await this.ingredientRepository.save(ingredient);
    }

    async getIngredientsPagination(pagination: Pagination) {
        const queryBuilder = this.ingredientRepository
            .createQueryBuilder("ingredient")
            .where('ingredient.name like :name', { name: `%${pagination.search || ''}%` })
            .skip(pagination.skip)
            .take(pagination.take)
            .orderBy("ingredient.createdAt", "DESC");

        const itemCount = await queryBuilder.getCount();
        const { entities } = await queryBuilder.getRawAndEntities();

        const meta = new Meta({ itemCount, pagination });
        return new PaginationModel(entities, meta);
    }

    async getIngredientsById(id: string) {
        const ingredient  = await this.ingredientRepository.findOne({
            where: {
                id
            }
        });
        if (!ingredient) throw new ApiException(ErrorMessages.INGREDIENT_NOT_FOUND);
        return ingredient;
    }

    async deleteIngredients(id: string) {
        return await this.ingredientRepository.delete(id);
    }

    async updateIngredients(id: string, dto: IngredientsCreateDto, images: Express.Multer.File[]) {
        const ingredient = await this.getIngredientsById(id);

        if (images.length > 0 && ingredient.images.length > 0) {
            await this.storageService.deleteMultiFiles(ingredient.images);
        }

        const imagesPath = images.length > 0 ? await this.storageService.uploadMultiFiles(ImagePath.CARD_INGREDIENTS, images) : ingredient.images;

        const updateIngredient = this.ingredientRepository.merge(ingredient, {
            ...dto,
            images: imagesPath
        })

        return await this.ingredientRepository.save(updateIngredient);
    }
}
