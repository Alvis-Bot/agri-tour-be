import {Body, Controller, Get, Post, Query, UploadedFile, UploadedFiles, UseGuards} from '@nestjs/common';
import {CropsService} from "./crops.service";
import {ApiFiles} from "../common/decorator/file.decorator";
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
    @ApiFiles('images' , 10,FileTypes.IMAGE)
    async createCrop(
        @Body() dto: CropCreateDto,
        @UploadedFiles() image: Express.Multer.File[]
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
