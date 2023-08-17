import {Body, Controller, Get, Post, Put, Query, UploadedFile, UseGuards} from '@nestjs/common';
import {CropsService} from "./crops.service";
import {ApiFile} from "../common/decorator/file.decorator";
import {FileTypes} from "../common/enum";
import {CropCreateDto} from "./dto/crop-create.dto";
import {JwtAuthGuard} from "../auth/guard/jwt-auth.guard";
import {ApiTags} from "@nestjs/swagger";
import {Pagination} from "../common/pagination/pagination.dto";

@Controller('crops')
@UseGuards(JwtAuthGuard)
@ApiTags('Thêm cây trồng')
export class CropsController {

    constructor(
        private readonly cropsService: CropsService
    ) {}

    @Post()
    @ApiFile('image' , FileTypes.IMAGE)
    async createCrop(
        @Body() dto: CropCreateDto,
        @UploadedFile() image: Express.Multer.File
    ) {
        return await this.cropsService.createCrop(dto ,image);
    }


    @Get('')
    async getCropsPagination(
        @Query() pagination: Pagination
    ) {
        return await this.cropsService.getCropsPagination(pagination);
    }







}
