import { Body, Controller, Get, Post, Query, UploadedFile, UploadedFiles, UseGuards } from '@nestjs/common';
import { CropsService } from "./crops.service";
import { ApiMemoryFiles } from "../common/decorator/file.decorator";
import { FileTypes } from "../common/enum";
import { CropCreateDto } from "./dto/crop-create.dto";
import { JwtAuthGuard } from "../auth/guard/jwt-auth.guard";
import { ApiTags } from "@nestjs/swagger";
import { Pagination } from "../common/pagination/pagination.dto";
import { QueryIdDto } from 'src/common/dto/query-id.dto';
import { Crop } from 'src/common/entities/crop.entity';
import { Note } from 'src/common/decorator/description.decorator';
@Controller('crops')
@UseGuards(JwtAuthGuard)
@ApiTags('Thêm cây trồng')
export class CropsController {

    constructor(
        private readonly cropsService: CropsService
    ) { }

    @Post()
    @ApiMemoryFiles('images', 10, FileTypes.IMAGE)
    async createCrop(
        @Body() dto: CropCreateDto,
        @UploadedFiles() image: Express.Multer.File[]
    ) {
        return await this.cropsService.createCrop(dto, image);
    }

    @Get('get-list-care')
    @Note("Lấy dữ liệu lịch chăm sóc của cây trồng")
    async getlistcareById(@Query() { id }: QueryIdDto): Promise<Crop> {
        return await this.cropsService.getRelationByCropId(id, "careSchedules");
    }
    @Get('get-list-work')
    @Note("Lấy dữ liệu công việc hằng ngày của cây trồng")
    async getListWorkByCrop(@Query() { id }: QueryIdDto): Promise<Crop> {
        return await this.cropsService.getRelationByCropId(id, "workOfDays");
    }
    @Get('get-list-harvest')
    @Note("Lấy dữ liệu thu hoạch của cây trồng")
    async get(@Query() { id }: QueryIdDto): Promise<Crop> {
        return await this.cropsService.getRelationByCropId(id, "harvests");
    }
    @Get('')
    async getCropsPagination(
        @Query() pagination: Pagination
    ) {
        return await this.cropsService.getCropsPagination(pagination);
    }








}
