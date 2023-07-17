import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ILike, TreeRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: TreeRepository<Category>,
  ) { }
  async createRootCategory(categoryData: CreateCategoryDto): Promise<Category> {
    try {
      const creating = this.categoryRepository.create(categoryData);
      return await this.categoryRepository.save(creating);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async createCategory(name: string, parentId?: string): Promise<Category> {
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

  async searchCategoriesByName(name: string): Promise<Category[]> {
    return this.categoryRepository.find({
      where: {
        name: ILike(`%${name}%`),
        active: true
      }
    });
  }
  async searchCategoryByName(name: string): Promise<Category> {
    return this.categoryRepository.findOne({
      where: {
        name: ILike(`%${name}%`),
        active: true
      }
    });
  }
  
  async getAllCategoryDetailsByCateId(id: string): Promise<any[]> {
    const cate_details = await this.categoryRepository.find({
      where: {
        id,
        active: true
      },

      relations: ['details'],

    });
    return cate_details.flatMap((details)=>details.details);
  }

  async getCategoryById(id: string): Promise<Category> {
    try {
      const category = await this.categoryRepository.findOne({
        where: {
          id
        }
      });
      if (!category) {
        throw new NotFoundException("Category not found");
      }
      return category;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async updateCategory(id: string, name: string): Promise<Category> {
    const category = await this.getCategoryById(id);
    category.name = name;

    return await this.categoryRepository.save(category);
  }

  async deleteCategory(id: string): Promise<void | Object> {
    const category = await this.getCategoryById(id);
    // const deleting = await this.categoryRepository.softDelete(id);
    // if (!deleting) {
    //   throw new BadRequestException('Category not deleted');
    // }
    return {
      message: "Delete Category Successfully"
    }
  }

  async getCategoryWithChildren(categoryId: string): Promise<Category> {
    return this.categoryRepository.findOneOrFail({
      where: {
        id: categoryId
      }
      , relations: ['children']
    });
  }
}