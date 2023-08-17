import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {CreateCategoryDetailDto} from './dto/create-category-detail.dto';
import {UpdateCategoryDetailDto} from './dto/update-category-detail.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {CategoryDetails} from '../common/entities/category-detail.entity';
import {Repository} from 'typeorm';
import {Category} from 'src/common/entities/category.entity';
import * as fs from 'fs';
import * as Excel from 'exceljs';
import {ImportDataCategoryDto} from './dto/import_category.dto';
import {Type} from 'src/common/entities/type.entity';
import {Pagination} from 'src/common/pagination/pagination.dto';
import {ApiException} from "../exception/api.exception";
import {ErrorMessages} from "../exception/error.code";

type ValidRelations = 'type' | 'details';
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
    const category = await this.findOneCategory(createCategoryDetailsDto.cateId, ["type"]);
    let creating = this.categoryDetailsRepository.create(createCategoryDetailsDto);
    if (category.type.name === "PRODUCT_TYPE") {
      creating.child_column = {
        color: await this.generateRandomRGB()
      }
    }
    return await this.categoryDetailsRepository.save({
      ...creating,
      category
    });

  }
  async generateRandomRGB(): Promise<string> {
    const r = Math.floor(Math.random() * 256); // Random value for red (0 to 255)
    const g = Math.floor(Math.random() * 256); // Random value for green (0 to 255)
    const b = Math.floor(Math.random() * 256); // Random value for blue (0 to 255)
    return `rgb(${r},${g},${b})`; // Return the RGB color string
  }

  async findAll(pagination: Pagination): Promise<CategoryDetails[]> {
    return await this.categoryDetailsRepository.find({
      where: {
        active: true,

      },
      order: {
        createdAt: pagination.order
      },
      skip: pagination.skip,
      take: pagination.take,
    });
  }

  async getDataByCategoryId(cate_id: string): Promise<CategoryDetails | any> {
    const category = await this.findOneCategory(cate_id, ['details']);

    return category.details.flatMap(details => details);
  }

  async getDetailCategoryById(id: string): Promise<CategoryDetails> {
    const categoryDetails = await this.categoryDetailsRepository.findOne({
      where: { id }
    });
    if (!categoryDetails) {
      throw new ApiException(ErrorMessages.CATEGORY_DETAIL_NOT_FOUND)
    }
    return categoryDetails;
  }

  async update(id: string, updateCategoryDetailsDto: UpdateCategoryDetailDto): Promise<CategoryDetails> {
    const categoryDetails = await this.getDetailCategoryById(id);
    categoryDetails.name = updateCategoryDetailsDto.name;
    categoryDetails.description = updateCategoryDetailsDto.description;

    return await this.categoryDetailsRepository.save(categoryDetails);
  }

  async remove(id: string): Promise<Object> {
    const categoryDetails = await this.getDetailCategoryById(id);

    await this.categoryDetailsRepository.remove(categoryDetails);
    return {
      message: ["Delete successfully"]
    }
  }

  async findOneCategory(id: string, relations?: ValidRelations[]): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: {
        id,
        active: true
      },
      relations,
    })
    if (!category) {
      throw new NotFoundException('Could not find category');
    }
    return category;
  }
  async readDataFromExcel(dto: ImportDataCategoryDto): Promise<CategoryDetails | any> {
    const workbook = new Excel.Workbook();
    const filePath = dto.file;
    try {
      const category = await this.findOneCategory(dto.cateId);
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
