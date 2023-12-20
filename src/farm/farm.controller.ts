import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { ImagePath, Router } from '../common/enum';
import { Note } from '../common/decorator/description.decorator';
import { FarmCreateDto } from '../common/dto/farm-create.dto';

import { AuthUser } from '../common/decorator/user.decorator';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { QueryAllDto } from './dto/query-all.dto';
import { Farm } from 'src/common/entities/farm.entity';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { FarmService } from './farm.service';
import { ApiFile } from '../common/decorator/file.decorator';
import { MulterUtils, UploadTypesEnum } from '../common/utils/multer.utils';
import { User } from '../common/entities/user.entity';
import { UUIDQuery } from "../common/decorator/uuid.decorator";
import { Pagination } from 'src/common/pagination/pagination.dto';
import { PaginationModel } from 'src/common/pagination/pagination.model';
import { UpdateFarmDTO } from 'src/common/dto/farm-update.dto';

@Controller(Router.FARM)
@UseGuards(JwtAuthGuard)
@ApiTags('Farm APIs')
export class FarmController {
  constructor(private readonly farmService: FarmService) { }

  @Post('create-farm')
  @Note('Tạo mới một trang trại')
  @ApiConsumes('multipart/form-data')
  @ApiFile(
    'image',
    MulterUtils.getConfig(UploadTypesEnum.IMAGES, ImagePath.CARD_FARM),
  )
  async createFarm(
    @UploadedFile() image: Express.Multer.File,
    @Body() dto: FarmCreateDto,
    @AuthUser() user: User,
  ): Promise<Farm> {
    return await this.farmService.createFarm(dto, image, user);
  }
  @Put('update-farm')
  @Note('Cập nhật một trang trại')
  @ApiConsumes('multipart/form-data')
  @ApiFile(
    'image',
    MulterUtils.getConfig(UploadTypesEnum.IMAGES, ImagePath.CARD_FARM),
  )
  async updateFarm(
    @UUIDQuery('id') id: string,
    @UploadedFile() image: Express.Multer.File,
    @Body() dto: UpdateFarmDTO,
    @AuthUser() user: User,
  ): Promise<Farm> {
    return await this.farmService.updateFarm(id, dto, image, user);
  }
  @Get()
  @Note('Lấy thông tin trang trại theo id')
  async getFarmById(@UUIDQuery('id') id: string) {
    return this.farmService.getFarmById(id);
  }

  @Get('area-land')
  @Note('Lấy toàn bộ thông tin nông trại')
  async getFarmFetchLandAndArea(@Query() dto: QueryAllDto) {
    return this.farmService.getFarmFetchLandAndArea(dto);
  }

  @Get('all')
  @Note('Lấy danh sách trang trại')
  async getFarms(@Query() pagination: Pagination): Promise<PaginationModel<Farm>> {
    return await this.farmService.getFarms(pagination);
  }
  @Delete('delete')
  @Note('Xoá nông trại')
  async deleteFarm(@UUIDQuery('id') id: string) {
    return await this.farmService.removeFarm(id);
  }
}
