import {Body, Controller, Delete, Get, Post, Query, UploadedFiles} from '@nestjs/common';
import {SuppliesService} from "./supplies.service";
import {FileTypes} from "../common/enum";
import {ApiFiles} from "../common/decorator/file.decorator";
import {SuppliesCreateDto} from "./dto/supplies-create.dto";
import {ApiTags} from "@nestjs/swagger";
import {Pagination} from "../common/pagination/pagination.dto";
import {Note} from "../common/decorator/description.decorator";
import {UUIDParam, UUIDQuery} from "../common/decorator/uuid.decorator";

@Controller('supplies')
@ApiTags('Thêm vật tư')
export class SuppliesController {

    constructor(
        private readonly suppliesService: SuppliesService
    ) {
    }

    @Post()
    @Note('Thêm vật tư')
    @ApiFiles('images', 10, FileTypes.IMAGE)
    async createSupplies(
        @Body() dto: SuppliesCreateDto,
        @UploadedFiles() images: Express.Multer.File[]
    ) {
        return await this.suppliesService.createSupplies(dto, images);
    }

    @Get()
    @Note('Lấy danh sách vật tư')
    async getSuppliesPagination(
        @Query() pagination: Pagination
    ) {
        return await this.suppliesService.getSuppliesPagination(pagination);
    }

    @Get(':id')
    @Note('Lấy thông tin vật tư theo id')
    async getSuppliesById(
        @UUIDParam('id') id: string
    ) {
        return await this.suppliesService.getSuppliesById(id);
    }

    @Delete()
    @Note('Xóa vật tư')
    async deleteSupplies(
        @UUIDQuery('id') id: string
    ) {
        return await this.suppliesService.deleteSupplies(id);
    }


}
