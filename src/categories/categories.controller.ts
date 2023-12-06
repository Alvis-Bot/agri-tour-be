import { Controller, Get, Post, Body , Patch, Delete, Query } from '@nestjs/common';
import { Category } from '../common/entities/category.entity';
import { CategoryService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import {  ApiResponse, ApiTags } from '@nestjs/swagger';
import { CategoryDetails } from 'src/common/entities/category-detail.entity';
import { Note } from 'src/common/decorator/description.decorator';
import { UpdateCategoryDto } from './dto/update-category.dto';
import {UUIDQuery} from "../common/decorator/uuid.decorator";

@ApiTags("Category APIs")
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Post('create-root')
  async createRootCategory(): Promise<Category> {
    return this.categoryService.createRootCategory();
  }

  @Post('create-child-category')
  async createChildCategory(
    @Body() dto: CreateCategoryDto,
    @Query('parentId') parentId: string,
    @Query('type') type: string

  ): Promise<Category> {
    return this.categoryService.createCategory(dto, type, parentId);
  }

  @Get('list_type_category')
  async list_category() {
    return await this.categoryService.findAllTypesCategory();

  }
  @Get('gets')
  async getAllCategories(
    @Query('depth') depth?: number
  ): Promise<Category[]> {

    return this.categoryService.getAllCategories(depth);

  }

  @Get('getsByCategory')
  @Note("Lấy dữ liệu danh mục theo type")
  async findAllByCateid(@Query('type') type: string): Promise<CategoryDetails[]> {
    return await this.categoryService.getAllCategoryDetailsByType(type);
  }

  
  @Get('get')
  async getCategoryById(@UUIDQuery('id') id: string): Promise<Category> {
    return this.categoryService.getCategoryById(id);
  }

  @Get('getCategoryByName')
  @Note("Tìm  danh mục theo tên")

  async findOneByName(@Query('name') name: string): Promise<Category> {
    return await this.categoryService.searchCategoryByName(name);
  }

  @Get('getsCategoryByName')
  @Note("Tìm nhiều danh mục theo tên")
  @ApiResponse({ status: 200, description: 'Returns all category details from category', type: CategoryDetails, isArray: true })
  async findAllByName(@Query('name') name: string): Promise<Category[]> {
    return await this.categoryService.searchCategoriesByName(name);
  }


  @Patch('update')
  async updateCategory(@Query('id') id: string, @Body() categoryData: UpdateCategoryDto): Promise<Category> {
    return this.categoryService.updateCategory(categoryData, id);
  }

  @Delete('delete')
  async deleteCategory(@UUIDQuery('id') id: string): Promise<void> {
     await this.categoryService.deleteCategory(id);
  }


}



