import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDetailDto } from './dto/create-category-detail.dto';
import { UpdateCategoryDetailDto } from './dto/update-category-detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryDetails } from './entities/category-detail.entity';
import { Like, Repository } from 'typeorm';
import { Category } from 'src/categories/entities/category.entity';
import * as fs from 'fs';
import * as path from 'path';
import * as Excel from 'exceljs';
import { ImportDataCategoryDto } from './dto/import_category.dto';
import { Type } from 'src/types/entities/type.entity';
import { Pagination } from 'src/common/pagination/pagination.dto';
@Injectable()
export class CategoryDetailsService {
  constructor(
    @InjectRepository(CategoryDetails)
    private readonly categoryDetailsRepository: Repository<CategoryDetails>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Type)
    private readonly typeRepository: Repository<Type>,
  ) { }

  async getCategoryDetailsByParentId(idParent: string): Promise<CategoryDetails[]> {
    return this.categoryDetailsRepository.find({ where: { id_parent: idParent } });
  }

  async create(createCategoryDetailsDto: CreateCategoryDetailDto): Promise<CategoryDetails | any> {
    const type = await this.typeRepository.findOne({
      where: { name: createCategoryDetailsDto.type }
    })
    if (!type) throw new NotFoundException("TYPE not found")

    const category = await this.categoryRepository.findOne({
      where: {
        type,
        active: true
      },
      select: ['id', 'name', 'description'],
    })
    return category;
    // if (!category) {
    //   throw new NotFoundException('Could not find category');
    // }
    // const creating = await this.categoryDetailsRepository.create({
    //   ...createCategoryDetailsDto,
    //   category,
    // })

    // return await this.categoryDetailsRepository.save(creating);

  }

  async findAll(pagination: Pagination): Promise<CategoryDetails[]> {
    return await this.categoryDetailsRepository.find({
      where: {
        active: true,

      },
      order: {
        id: pagination.order
      },
      skip: pagination.skip,
      take: pagination.take,
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


  async readDataFromExcel(dto: ImportDataCategoryDto): Promise<CategoryDetails | any> {
    const workbook = new Excel.Workbook();
    const filePath = dto.file;
    try {
      const category = await this.categoryRepository.findOne({
        where: {
          id: dto.cateId,
          active: true
        },
        select: ['id', 'name', 'description']
      })
      if (!category) {
        throw new NotFoundException('Could not find category');
      }
      // Load the workbook
      await workbook.xlsx.readFile(filePath);
      // Get the worksheet
      const worksheet = workbook.getWorksheet(1);

      // // Start a transaction
      // const queryRunner = this.entityManager.connection.createQueryRunner();
      // await queryRunner.startTransaction();
      const data = [];
      const columns = {};

      worksheet.eachRow((row, rowNumber) => {
        if (rowNumber === 1) {
          //đếm nếu dòng 1 là header thì lấy tên header
          // Extract column names from the header row (rowNumber = 1)
          row.eachCell((cell, colNumber) => {
            //lặp ra mỗi ô(cell) trong dòng để lấy index và tên cột
            columns[colNumber] = cell.value as string;
          });
        } else {
          //lấy các dòng bỏ header
          // Extract data from subsequent rows and use column names from the header row
          const rowData = {};
          row.eachCell((cell, colNumber) => {
            rowData[columns[colNumber]] = cell.value as string;
          });

          data.push({ ...rowData, category: category.id });
        }
      });

      const creating = this.categoryDetailsRepository.create(data);
      fs.unlinkSync(filePath);
      return await this.categoryDetailsRepository.save(creating);

    } catch (error) {
      console.log("Create failed ! File deleting...");
      fs.unlinkSync(filePath);
      throw new BadRequestException(error.message);
    }

  }
}
