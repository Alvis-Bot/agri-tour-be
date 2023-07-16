import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { TreeRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: TreeRepository<Category>,
  ) { }

  async createCategory(name: string, parentId?: number): Promise<Category> {
    const category = new Category();
    category.name = name;

    if (parentId) {
      const parent = await this.categoryRepository.findOne({
        where: {
          id: parentId,
        }
      });
      category.parent = parent;
    }

    return this.categoryRepository.save(category);
  }

  async getAllCategories(): Promise<Category[]> {
    return await this.categoryRepository.findTrees();
  }

  async getCategoryById(id: number): Promise<Category> {
    return await this.categoryRepository.findOneOrFail({
      where: {
        id
      }
    });
  }

  async updateCategory(id: number, name: string): Promise<Category> {
    const category = await this.getCategoryById(id);
    category.name = name;

    return await this.categoryRepository.save(category);
  }

  async deleteCategory(id: number): Promise<void> {
    await this.categoryRepository.softDelete(id);
  }

  async getCategoryWithChildren(categoryId: number): Promise<Category> {
    return this.categoryRepository.findOneOrFail({
      where: {
        id: categoryId
      }
      , relations: ['children']
    });
  }
}