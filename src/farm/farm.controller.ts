import {
  Body,
  Controller,
  Get,
  Post,
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
import {UUIDQuery} from "../common/decorator/uuid.decorator";

@Controller(Router.FARM)
@UseGuards(JwtAuthGuard)
@ApiTags('Farm APIs')
export class FarmController {
  constructor(private readonly farmService: FarmService) {}

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
  async getFarms() {
    return this.farmService.getFarms();
  }
}
