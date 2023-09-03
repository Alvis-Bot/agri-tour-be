import {Body, Controller, Delete, Get, Post, Query, UploadedFiles} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {IngredientsService} from "./ingredients.service";
import {ApiFiles} from "../common/decorator/file.decorator";
import {FileTypes} from "../common/enum";
import {IngredientsCreateDto} from "./dto/ingredients-create.dto";
import {Pagination} from "../common/pagination/pagination.dto";
import {Note} from "../common/decorator/description.decorator";
import {UUIDParam, UUIDQuery} from "../common/decorator/uuid.decorator";

@Controller('ingredients')
@ApiTags('APIs nguyên liệu')
export class IngredientsController {

    constructor(
        private readonly ingredientsService: IngredientsService
    ) {}

    @Post()
    @Note('API thêm nguyên liệu')
    @ApiFiles('images', 10 ,FileTypes.IMAGE)
    async createIngredient(
        @Body() dto: IngredientsCreateDto,
        @UploadedFiles() images: Express.Multer.File[]
    ) {
        return await this.ingredientsService.createIngredient(dto, images);
    }

    @Get()
    @Note('API lấy danh sách nguyên liệu')
    async getIngredientsPagination(
        @Query() pagination: Pagination
    ) {
        return await this.ingredientsService.getIngredientsPagination(pagination);
    }

    @Get(':id')
    @Note('API lấy thông tin nguyên liệu theo id')
    async getIngredientsById(
        @UUIDParam('id') id: string
    ) {
        return await this.ingredientsService.getIngredientsById(id);
    }

    @Delete()
    @Note('API xóa nguyên liệu')
    async deleteIngredients(
        @UUIDQuery('id') id: string
    ) {
        return await this.ingredientsService.deleteIngredients(id);
    }

}
