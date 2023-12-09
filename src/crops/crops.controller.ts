import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseGuards,
} from '@nestjs/common';
import { CropsService } from './crops.service';
import { ApiFiles } from '../common/decorator/file.decorator';
import { CropCreateDto } from './dto/crop-create.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { Pagination } from '../common/pagination/pagination.dto';
import { Crop } from 'src/common/entities/crop.entity';
import { Note } from 'src/common/decorator/description.decorator';
import { MulterUtils, UploadTypesEnum } from '../common/utils/multer.utils';
import { ImagePath } from '../common/enum';
import { UUIDQuery } from '../common/decorator/uuid.decorator';
import {CropDeleteImageDto, CropUpdateDto, CropUpdateImageDto} from './dto/crop-update.dto';
import { DeleteResponse } from '../common/type';

@Controller('crops')
@UseGuards(JwtAuthGuard)
@ApiTags('APIs Crops  - APIs cây trồng')
export class CropsController {
  constructor(private readonly cropsService: CropsService) {}

  @Post()
  @Note('Tạo mới cây trồng')
  @ApiFiles(
    'images',
    10,
    MulterUtils.getConfig(UploadTypesEnum.IMAGES, ImagePath.CARD_CROP),
  )
  async createCrop(
    @Body() dto: CropCreateDto,
    @UploadedFiles() image: Express.Multer.File[],
  ) {
    return await this.cropsService.createCrop(dto, image);
  }

  @Put()
  @Note('Cập nhật cây trồng')
  async updateCrop(
    @Query('cropId') cropId: string,
    @Body() dto: CropUpdateDto,
  ) {
    return await this.cropsService.updateCrop(cropId, dto);
  }

  @Put('images/add')
  @Note('Cập nhật thêm ảnh cho cây trồng')
  @ApiFiles(
    'images',
    10,
    MulterUtils.getConfig(UploadTypesEnum.IMAGES, ImagePath.CARD_CROP),
  )
  async updateCropImage(
    @Query('cropId') cropId: string,
    @Body() dto: CropUpdateImageDto,
    @UploadedFiles() image: Express.Multer.File[],
  ) {
    return await this.cropsService.updateCropImage(cropId, image);
  }

  @Put('images/delete')
    @Note('Xóa ảnh của cây trồng')
    async deleteCropImage(
      @Query('cropId') cropId: string,
      @Body() dto: CropDeleteImageDto,
    ) {
      return await this.cropsService.deleteCropImage(cropId, dto);
    }

  @Delete()
  @Note('Xóa cây trồng')
  async deleteCrop(
    @UUIDQuery('cropId') cropId: string,
  ): Promise<DeleteResponse> {
    return await this.cropsService.deleteCrop(cropId);
  }

  @Get('get-list-care')
  @Note('Lấy dữ liệu lịch chăm sóc của cây trồng')
  async getlistcareById(@UUIDQuery('id') id: string): Promise<Crop> {
    return await this.cropsService.getRelationByCropId(id, 'careSchedules');
  }

  @Get('get-list-work')
  @Note('Lấy dữ liệu công việc hằng ngày của cây trồng')
  async getListWorkByCrop(@UUIDQuery('id') id: string): Promise<Crop> {
    return await this.cropsService.getRelationByCropId(id, 'workOfDays');
  }

  @Get('get-list-harvest')
  @Note('Lấy dữ liệu thu hoạch của cây trồng')
  async get(@UUIDQuery('id') id: string): Promise<Crop> {
    return await this.cropsService.getRelationByCropId(id, 'harvests');
  }

  @Get('')
  @Note('Lấy danh sách cây trồng')
  async getCropsPagination(@Query() pagination: Pagination) {
    return await this.cropsService.getCropsPagination(pagination);
  }
}
