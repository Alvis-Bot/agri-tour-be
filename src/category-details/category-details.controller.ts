import { Controller, Get, Post, Body, Patch, Query, Delete, Put } from '@nestjs/common';
import { CategoryDetailsService } from './category-details.service';

import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CategoryDetails } from './entities/category-detail.entity';
import { CreateCategoryDetailDto } from './dto/create-category-detail.dto';
import { UpdateCategoryDetailDto } from './dto/update-category-detail.dto';

@Controller('category-details')
@ApiTags('Category-details')
export class CategoryDetailsController {
  constructor(private readonly categoryDetailsService: CategoryDetailsService) { }


  @Post('create')
  @ApiResponse({ status: 201, description: 'Creates a new category detail', type: CategoryDetails })
  async create(@Query('cate_id') cateId: string, @Body() createCategoryDetailsDto: CreateCategoryDetailDto): Promise<CategoryDetails> {
    return this.categoryDetailsService.create(createCategoryDetailsDto, cateId);
  }

  @Get('gets')
  @ApiResponse({ status: 200, description: 'Returns all category details', type: CategoryDetails, isArray: true })
  async findAll(): Promise<CategoryDetails[]> {
    return await this.categoryDetailsService.findAll();
  }


  @Get('get')
  @ApiResponse({ status: 200, description: 'Returns a category detail by ID', type: CategoryDetails })
  async findOne(@Query('id') id: string): Promise<CategoryDetails> {
    return await this.categoryDetailsService.findOne(id);
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
  async remove(@Query('id') id: string): Promise<void | Object> {
    return await this.categoryDetailsService.remove(id);
  }
}
