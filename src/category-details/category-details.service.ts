import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDetailDto } from './dto/create-category-detail.dto';
import { UpdateCategoryDetailDto } from './dto/update-category-detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryDetails } from './entities/category-detail.entity';
import { Repository } from 'typeorm';
import { Category } from 'src/categories/entities/category.entity';

@Injectable()
export class CategoryDetailsService {
  constructor(
    @InjectRepository(CategoryDetails)
    private readonly categoryDetailsRepository: Repository<CategoryDetails>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) { }

  async create(createCategoryDetailsDto: CreateCategoryDetailDto, cate_id: string): Promise<CategoryDetails> {
    const category = await this.categoryRepository.findOne({
      where: {
        id: cate_id,
        active: true
      },
      select: ['id', 'name', 'description']
    })
    if (!category) {
      throw new NotFoundException('Could not find category');
    }
    const creating = await this.categoryDetailsRepository.create({
      ...createCategoryDetailsDto,
      category,
    })

    return await this.categoryDetailsRepository.save(creating);

  }

  async findAll(): Promise<CategoryDetails[]> {
    return await this.categoryDetailsRepository.find({
      where: {
        active: true
      }
    });
  }


  async findOne(id: string): Promise<CategoryDetails> {
    const categoryDetails = await this.categoryDetailsRepository.findOne({
      where: { id }
    });
    if (!categoryDetails) {
      throw new NotFoundException('Category Detail not found');
    }
    return categoryDetails;
  }

  async update(id: string, updateCategoryDetailsDto: UpdateCategoryDetailDto): Promise<CategoryDetails> {
    const categoryDetails = await this.findOne(id);
    categoryDetails.name = updateCategoryDetailsDto.name;
    categoryDetails.description = updateCategoryDetailsDto.description;

    return await this.categoryDetailsRepository.save(categoryDetails);
  }

  async remove(id: string): Promise<void | Object> {
    const categoryDetails = await this.findOne(id);
    await this.categoryDetailsRepository.delete(categoryDetails);
    return {
      message: 'Removed category detail from category successfully'
    }
  }
}
