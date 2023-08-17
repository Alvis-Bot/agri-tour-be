import { Controller, Get, Post, Body, Patch, Query, Delete, Put, BadRequestException, UseInterceptors, UploadedFile } from '@nestjs/common';
import { CategoryDetailsService } from './category-details.service';
import { ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CategoryDetails } from '../common/entities/category-detail.entity';
import { CreateCategoryDetailDto } from './dto/create-category-detail.dto';
import { UpdateCategoryDetailDto } from './dto/update-category-detail.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { ImportDataCategoryDto } from './dto/import_category.dto';
import { Pagination } from 'src/common/pagination/pagination.dto';
@Controller('category-details')
@ApiTags('Category Details APIs')
export class CategoryDetailsController {
  constructor(private readonly categoryDetailsService: CategoryDetailsService) { }

  @Post('upload')
  @ApiConsumes('multipart/form-data')

  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: 'uploads',
      filename: (req, file, callback) => {
        const name = file.originalname;
        path.join('uploads', `${name}`);
        console.log("Uploading...");
        callback(null, `${name}`);

      },
    }),
  }))
  async uploadExcelFile(@Body() dto: ImportDataCategoryDto, @UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Uploaded file failed')
    }
    const filePath = file?.path;
    console.log(filePath)
    return await this.categoryDetailsService.readDataFromExcel({
      ...dto,
      file: filePath,
    });
  }



  @Post('create')
  async create(@Query('cateId') cateId: string, @Body() createCategoryDetailsDto: CreateCategoryDetailDto): Promise<CategoryDetails> {
    return this.categoryDetailsService.create({ ...createCategoryDetailsDto, cateId });
  }

  @Get('gets')
  @ApiResponse({ status: 200, description: 'Returns all category details', type: CategoryDetails, isArray: true })
  async findAll(@Query() pagination: Pagination): Promise<CategoryDetails[]> {
    return await this.categoryDetailsService.findAll(pagination);
  }
  @Get('get-by-parent-id')
  async getCategoryDetailsByParentId(@Query('id_parent') idParent: string): Promise<CategoryDetails[]> {
    return this.categoryDetailsService.getCategoryDetailsByParentId(idParent);
  }

  @Get('get-data-by-cate-id')
  async getCateByCategoryId(@Query('categoryId') cate_id: string): Promise<CategoryDetails[]> {
    return this.categoryDetailsService.getDataByCategoryId(cate_id);
  }
  @Get('get')
  @ApiResponse({ status: 200, description: 'Returns a category detail by ID', type: CategoryDetails })
  async findOne(@Query('id') id: string): Promise<CategoryDetails> {
    return await this.categoryDetailsService.getDetailCategoryById(id);
  }

  @Put('update')
  @ApiResponse({ status: 200, description: 'Updates a category detail', type: CategoryDetails })
  async update(
    @Query('id') id: string,
    @Body() updateCategoryDetailsDto: UpdateCategoryDetailDto,
  ): Promise<CategoryDetails> {
    return await this.categoryDetailsService.update(id, updateCategoryDetailsDto);
  }

  @Delete('delete')
  @ApiResponse({ status: 200, description: 'Deletes a category detail' })
  async remove(@Query('id') id: string): Promise<void | NonNullable<unknown>> {
    return await this.categoryDetailsService.remove(id);
  }


}
