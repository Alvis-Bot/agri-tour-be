import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { EntityManager, ILike, Like, Repository, TreeRepository } from 'typeorm';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import * as fs from 'fs';
import * as path from 'path';
import * as Excel from 'exceljs';
import { Type } from 'src/types/entities/type.entity';
import { CategoryDetails } from 'src/common/entities/category-detail.entity';
@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: TreeRepository<Category>,
    @InjectEntityManager() private readonly entityManager: EntityManager,
    @InjectRepository(Type)
    private readonly typeRepository: Repository<Type>,
  ) { }
  async findOneByType(name: string): Promise<Type> {
    const type = await this.typeRepository.findOne({
      where: { name },
      select: ['id', 'name']
    })
    if (!type) throw new NotFoundException('No type found');
    return type
  }
  async findAllTypesCategory(): Promise<Type[]> {
    return await this.typeRepository.find({
      select: ['id', 'name']
    });
  }
  async createRootCategory(): Promise<Category | any> {
    try {
      const type = await this.findOneByType('ROOT');

      const creating = this.categoryRepository.create({
        name: 'Tất cả danh mục',
        active: true,
        description: "Danh mục gốc",
        type
      });
      return await this.categoryRepository.save(creating);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async createCategory(data: CreateCategoryDto, type_name: string, parentId?: string): Promise<Category> {
    const type = await this.findOneByType(type_name);

    const creatingCategory = this.categoryRepository.create({
      ...data,
      type
    });

    if (parentId) {
      const parent = await this.categoryRepository.findOne({
        where: {
          id: parentId,
        }
      });
      creatingCategory.parent = parent;
    }
    const flagCheck = await this.categoryRepository.findOne({ where: { name: creatingCategory.name } });
    if (flagCheck) throw new ConflictException('CATEGORY IS EXISTING');

    return this.categoryRepository.save(creatingCategory);


  }

  async getAllCategories(depth?: number): Promise<Category[]> {
    var data: any;
    if (depth) {
      data = await this.categoryRepository.findTrees({
        depth
      });
    }
    else {
      data = await this.categoryRepository.findTrees();
    }
    return data;
  }
  async getOneCategoryByName(name: string): Promise<Category> {
    const cate = await this.categoryRepository.findOne({
      where: { name },
      select: ['id', 'name']
    })
    if (!cate) throw new NotFoundException(`Category ${name} not found`);
    return cate;
  }
  async searchCategoriesByName(name: string): Promise<Category[]> {
    return this.categoryRepository.find({
      where: {
        name: Like(`%${name}%`), // Use Like instead of ILike for case-sensitive search
        active: true,
      },
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

  async getAllCategoryDetailsByType(name: string): Promise<any[]> {
    const type = await this.findOneByType(name);
    const cate_details = await this.categoryRepository.find({
      where: {
        type,
        active: true
      },
      relations: ['details'],
    });
    return cate_details.flatMap((details) => details.details);
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

  async updateCategory(data: UpdateCategoryDto, id: string): Promise<Category> {
    try {
      const category = await this.getCategoryById(id);
      ;
      const mergedData = this.categoryRepository.merge(category, data);
      await this.categoryRepository.update(id, mergedData);
      return mergedData;
    } catch (error) {
      throw new BadRequestException({
        message: [error.message]
      });
    }
  }

  async deleteCategory(id: string): Promise<void | Object> {
    const category = await this.getCategoryById(id);
    const deleting = await this.categoryRepository.softDelete(id);
    if (!deleting) {
      throw new BadRequestException('Category not deleted');
    }
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