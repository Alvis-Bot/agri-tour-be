import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFiles, Query } from '@nestjs/common';
import { MaterialService } from './material.service';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Material } from 'src/common/entities/material.entity';
import { ApiMemoryFiles } from 'src/common/decorator/file.decorator';
import { FileTypes } from 'src/common/enum';
import { PaginationModel } from 'src/common/pagination/pagination.model';
import { Pagination } from 'src/common/pagination/pagination.dto';
import { QueryIdDto } from 'src/common/dto/query-id.dto';
@ApiTags("API Vật tư")
@Controller('material')
export class MaterialController {
  constructor(private readonly materialService: MaterialService) { }

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiMemoryFiles('images', 10, FileTypes.IMAGE)
  async create(@Body() createMaterialDto: CreateMaterialDto, @UploadedFiles() images: Express.Multer.File[]): Promise<Material> {
    return await this.materialService.create(createMaterialDto, images);
  }

  @Get()
  async findAll(@Query() pagination: Pagination): Promise<PaginationModel<Material>> {
    return await this.materialService.findAll(pagination);
  }

  @Get('findById')
  async findOne(@Query() { id }: QueryIdDto): Promise<Material> {
    return this.materialService.findOne(id);
  }

  @Patch('update')
  @ApiConsumes('multipart/form-data')
  @ApiMemoryFiles('images', 10, FileTypes.IMAGE)
  async update(@Query() { id }: QueryIdDto, @Body() updateMaterialDto: UpdateMaterialDto, @UploadedFiles() images: Express.Multer.File[]): Promise<Material> {

    return await this.materialService.update(id, {
      ...updateMaterialDto,
      images
    });
  }

  @Delete('delete')
  async remove(@Query() { id }: QueryIdDto): Promise<Object> {
    return await this.materialService.remove(id);
  }
}
