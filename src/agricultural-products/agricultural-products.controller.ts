import {Body, Controller, Delete, Get, Param, Post, Query, UploadedFiles} from '@nestjs/common';
import {AgriculturalProductsService} from "./agricultural-products.service";
import {Note} from "../common/decorator/description.decorator";
import {ApiFiles} from "../common/decorator/file.decorator";
import {FileTypes} from "../common/enum";
import {AgriculturalProductsCreateDto} from "./dto/agricultural-products-create.dto";
import {Pagination} from "../common/pagination/pagination.dto";
import {UUIDParam, UUIDQuery} from "../common/decorator/uuid.decorator";

@Controller('agricultural-products')
export class AgriculturalProductsController {
    constructor(
        private readonly agriculturalProductsService: AgriculturalProductsService
    ) {}


    @Post()
    @Note('API thêm sản phẩm nông sản')
    @ApiFiles('images', 10 ,FileTypes.IMAGE)
    async createAgriculturalProducts(
        @Body() dto: AgriculturalProductsCreateDto,
        @UploadedFiles() images: Express.Multer.File[]
    ) {
        return await this.agriculturalProductsService.createAgriculturalProducts(dto, images);
    }


    @Get()
    @Note('API lấy danh sách sản phẩm nông sản')
    async getAgriculturalProductsPagination(
        @Query() pagination: Pagination
    ) {
        return await this.agriculturalProductsService.getAgriculturalProductsPagination(pagination);
    }

    @Get(':id')
    @Note('API lấy thông tin sản phẩm nông sản')
    async getAgriculturalProductsById(
        @UUIDParam('id') id: string
    ) {
        return await this.agriculturalProductsService.getAgriculturalProductsById(id);
    }

    @Delete(':id')
    @Note('API xóa sản phẩm nông sản')
    async deleteAgriculturalProductsById(
        @UUIDParam('id') id: string
    ) {
        return await this.agriculturalProductsService.deleteAgriculturalProductsById(id);
    }
}
