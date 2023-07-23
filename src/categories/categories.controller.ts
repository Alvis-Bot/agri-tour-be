import { Controller, Get, Post, Body, Param, Patch, Delete, Query } from '@nestjs/common';
import { Category } from './entities/category.entity';
import { CategoryService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CategoryDetails } from 'src/category-details/entities/category-detail.entity';
import { Note } from 'src/common/decorator/description.decorator';

@ApiTags("Categories Table Tree")
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Post('create-root')
  async createRootCategory( @Body() categoryData: CreateCategoryDto,): Promise<Category> {
    return this.categoryService.createRootCategory(categoryData);
  }

  @Post('create-child-category')
  async createChildCategory(
    @Body() categoryData: CreateCategoryDto,
    @Query('parentId') parentId: string

  ): Promise<Category> {
    return this.categoryService.createCategory(categoryData.name, parentId);
  }

  @Get('gets')
  async getAllCategories(): Promise<Category[]> {
    return this.categoryService.getAllCategories();
  }
  
  @Get('getsByCategory')
  @Note("Lấy dữ liệu danh mục theo id")
  @ApiResponse({ status: 200, description: 'Returns all category details from category', type: CategoryDetails, isArray: true })
  async findAllByCateid(@Query('cate_id') cate_id: string): Promise<Category[]> {
    return await this.categoryService.getAllCategoryDetailsByCateId(cate_id);
  }
  @Get('get')
  async getCategoryById(@Query('id') id: string): Promise<Category> {
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
  async updateCategory(@Query('id') id: string, @Body() categoryData: Category): Promise<Category> {
    return this.categoryService.updateCategory(id, categoryData.name);
  }

  @Delete('delete')
  async deleteCategory(@Query('id') id: string): Promise<void | Object> {
    return await this.categoryService.deleteCategory(id);
  }
}
