import { Controller, Get, Post, Body, Param, Patch, Delete, Query } from '@nestjs/common';
import { Category } from './entities/category.entity';
import { CategoryService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags("Categories Table Tree")
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @ApiQuery({ name: 'parentId', required: false, type: Number })
  @Post('create')
  async createCategory(
    @Body() categoryData: CreateCategoryDto,
     @Query('parentId') parentId?: number
     
     ): Promise<Category> {
    return this.categoryService.createCategory(categoryData.name, parentId);
  }

  @Get('gets')
  async getAllCategories(): Promise<Category[]> {
    return this.categoryService.getAllCategories();
  }

  @Get('get')
  async getCategoryById(@Query('id') id: number): Promise<Category> {
    return this.categoryService.getCategoryById(id);
  }

  @Patch('update')
  async updateCategory(@Query('id') id: number, @Body() categoryData: Category): Promise<Category> {
    return this.categoryService.updateCategory(id, categoryData.name);
  }

  @Delete('delete')
  async deleteCategory(@Query('id') id: number): Promise<void> {
    return this.categoryService.deleteCategory(id);
  }
}
