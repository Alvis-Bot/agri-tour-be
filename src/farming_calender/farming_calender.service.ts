import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateFarmingCalenderDto } from '../common/dto/create-farming_calender.dto';
import { UpdateFarmingCalenderDto } from 'src/common/dto/update-farming_calender.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FarmingCalender } from 'src/common/entities/farming_calender.entity';
import { Repository } from 'typeorm';
import { User } from 'src/common/entities/user.entity';
import { Pagination } from "src/common/pagination/pagination.dto";
import { CategoryDetails } from "src/common/entities/category-detail.entity";
import { Category } from "src/common/entities/category.entity";
import { LandService } from "../land/land.service";
import { PaginationModel } from "src/common/pagination/pagination.model";
import { Meta } from "src/common/pagination/meta.dto";
type relationValid = "users" | "land" | "productType";
@Injectable()
export class FarmingCalenderService {
  constructor(
    @InjectRepository(FarmingCalender)
    private readonly farmingCalenderRepository: Repository<FarmingCalender>,
    private readonly landService: LandService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(CategoryDetails)
    private readonly categoryDetailRepository: Repository<CategoryDetails>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,

  ) { }
  async validateProductType(productTypeid: string): Promise<CategoryDetails> {
    const productType = await this.categoryDetailRepository.findOne({
      where: { id: productTypeid },
      relations: ['category']
    });

    if (!productType) {
      throw new NotFoundException({ message: ['Product type not found'] });
    }

    const findCategory = await this.categoryRepository.findOne({
      where: { id: productType.category.id },
      relations: ['type']
    });

    if (!findCategory || findCategory.type.name !== "PRODUCT_TYPE") {
      throw new NotFoundException({ message: ['Loại sản phẩm không hợp lệ'] });
    }
    return productType
  }

  async createFarmingCalender(landId: string, dto: CreateFarmingCalenderDto, user: User): Promise<FarmingCalender | any> {
    const land = await this.landService.getLandById(landId);
    if (!land) {
      throw new NotFoundException({ message: ['Vùng canh tác này không tồn tại vui lòng kiểm tra lại !'] });
    }
    const userIds = dto.users;
    if (!userIds) throw new BadRequestException({ message: ['User is valid.'] });
    const userPromises = userIds.map(async (userId) => {
      const user = await this.userRepository.findOne({
        where: { id: userId },
        select: ['id', 'fullName']
      });

      if (!user) {
        throw new NotFoundException(`Người dùng với ID ${userId} không tồn tại.`);
      }

      return user;
    });

    try {
      const users = await Promise.all(userPromises);
      const productType = await this.validateProductType(dto.productTypeId);
      // const checkingExists = await this.checkUserExistsWithFarm(landId, users);
      // if (!checkingExists) {
      //   throw new ConflictException('Một số người dùng đã tồn tại trong lịch canh tác của vùng này rồi !');
      // }

      const calender = this.farmingCalenderRepository.create({
        ...dto,
        users,
        land,
        productType
      });

      return await this.farmingCalenderRepository.save(calender);

    } catch (error) {
      throw new BadRequestException({ message: [error.message] });
    }
  }

  // async createFarmingCalender(landId: string, dto: CreateFarmingCalenderDto, user: User): Promise<FarmingCalender | any> {
  //   const userIds = dto.users;
  //   const errors = [];
  //   const validatedUserIds = [];
  //   const users = [];
  //   for (const userId of userIds) {
  //     try {
  //       const user = await this.userRepository.findOne({
  //         where: { id: userId },
  //         select: ['id', 'fullName']
  //       });
  //       if (!user) {
  //         throw new NotFoundException(`Người dùng với ID ${userId} không tồn tại.`);
  //       }

  //       // Thực hiện các kiểm tra khác cho từng người dùng (nếu cần)

  //       validatedUserIds.push(userId);
  //       users.push(user);

  //     } catch (error) {
  //       errors.push(error.message);
  //     }
  //   }

  //   if (errors.length > 0) {
  //     throw new BadRequestException({ message: errors });
  //   }

  //   const land = await this.landService.getLandById(landId);

  //   if (!land) throw new NotFoundException({
  //     message:
  //       ['Vùng canh tác này không tồn tại vui lòng kiểm tra lại !']

  //   })
  //   const productType = await this.categoryDetailRepository.findOne({
  //     where: { id: dto.productTypeId },
  //     relations: ['category']
  //   })
  //   if (!productType) throw new NotFoundException({
  //     message: ['Product type not found']
  //   })

  //   const findCategory = await this.categoryRepository.findOne({
  //     where: {
  //       id: productType.category.id
  //     },
  //     relations: ['type']
  //   })
  //   if (!findCategory) throw new NotFoundException({ message: ['Không tìm thấy danh mục cha chứa product type'] })
  //   if (findCategory.type.name !== "PRODUCT_TYPE") throw new NotFoundException({ message: ['Loại sản phẩm không hợp lệ'] })

  //   const checkingExists = await this.checkUserExistsWithFarm(landId, users);
  //   if (!checkingExists) throw new ConflictException('Some users already exist in a farming calendar for the specified land.');


  //   const calender = this.farmingCalenderRepository.create({
  //     ...dto,
  //     users,
  //     land,
  //     productType
  //   });

  //   return await this.farmingCalenderRepository.save(calender);
  // }


  // Hàm kiểm tra và thêm người dùng mới vào lịch canh tác
  // Hàm kiểm tra và thêm người dùng mới vào lịch canh tác
  async checkUserExistsWithCalender(existingUsers: User[], newUsers: User[]): Promise<void> {
    const existingUserIds = existingUsers.map((user) => user.id);
    const newUserIds = newUsers.map((user) => user.id);

    for (const newUser of newUsers) {
      if (!existingUserIds.includes(newUser.id)) {
        existingUsers.push(newUser);
      }
    }
  }




  async checkUserExistsWithFarm(landId: string, users: User[]): Promise<boolean> {

    const queryBuilder = this.farmingCalenderRepository.createQueryBuilder('farmingCalender');
    queryBuilder.innerJoinAndSelect('farmingCalender.users', 'user');
    queryBuilder.where('farmingCalender.landId = :landId', { landId });
    queryBuilder.andWhere('user.id IN (:...userIds)', { userIds: users.map((user) => user.id) });

    const existingFarmingCalenders = await queryBuilder.getMany();

    if (existingFarmingCalenders.length > 0) {
      return false

    }
    return true
    //Nếu không có trùng lặp tục xử lý tạo lịch canh tác hoặc thực hiện logic khác
  }

  async getAllFarmingCalenders(pagination: Pagination): Promise<PaginationModel<FarmingCalender> | any> {
    const relations: relationValid[] = ['users', 'land', "productType"];

    const [entities, itemCount] = await this.farmingCalenderRepository.findAndCount({
      relations,
      order: {
        createdAt: pagination.order
      },
      skip: pagination.skip,
      take: pagination.take
    });
    const meta = new Meta({ pagination, itemCount });
    return new PaginationModel<FarmingCalender>(entities, meta);

  }

  async getFarmingCalenderById(id: string, relations?: relationValid[]): Promise<FarmingCalender> {

    const farming_calender = await this.farmingCalenderRepository.findOne({
      where: {
        id,
      },
      relations,

    });

    if (!farming_calender) {
      throw new NotFoundException("Không tìm thấy lịch canh tác này !");
    }
    return farming_calender;
  }

  async updateFarmingCalender(id: string, data: UpdateFarmingCalenderDto, user: User): Promise<FarmingCalender | any> {
    const farmingCalender = await this.getFarmingCalenderById(id, ["productType", "users", "land"]);
    const userIds = data.users;
    const errors = [];
    const validatedUserIds = [];
    const users = [];
    for (const userId of userIds) {
      try {
        const user = await this.userRepository.findOne({
          where: { id: userId },
          // select: ['id', 'fullName']
        });
        if (!user) {
          throw new NotFoundException(`Người dùng với ID ${userId} không tồn tại.`);
        }

        // Thực hiện các kiểm tra khác cho từng người dùng (nếu cần)

        validatedUserIds.push(userId);
        users.push(user);

      } catch (error) {
        errors.push(error.message);
      }
    }

    if (errors.length > 0) {
      throw new BadRequestException({ message: errors });
    }

    const productType = await this.validateProductType(data.productTypeId)
    await this.checkUserExistsWithCalender(farmingCalender.users, users);

    try {
      farmingCalender.users = users;

      const merged = this.farmingCalenderRepository.merge(farmingCalender, {
        ...data,
        users,
        productType,
      });

      return await this.farmingCalenderRepository.save(merged);

    } catch (error) {
      throw new BadRequestException({
        message: [error.message]
      });
    }
  }

  async deleteFarmingCalender(id: string): Promise<void | object> {
    try {
      await this.farmingCalenderRepository.delete(id);

      return {
        message: ['Delete farming Calender successfully !']
      }
    } catch (error) {
      throw new BadRequestException({
        message: [error.message]
      })

    }
  }
}
