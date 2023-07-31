import { BadRequestException, ConflictException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { CreateFarmingCalenderDto } from '../common/dto/create-farming_calender.dto';
import { UpdateFarmingCalenderDto } from 'src/common/dto/update-farming_calender.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FarmingCalender } from 'src/common/entities/farming_calender.entity';
import { Repository } from 'typeorm';
import { Land } from 'src/common/entities/land.entity';
import { User } from 'src/common/entities/user.entity';
import { Service } from "../common/enum/service";
import { ILandService } from "../land/service/land";


@Injectable()
export class FarmingCalenderService {
  constructor(
    @InjectRepository(FarmingCalender)
    private readonly farmingCalenderRepository: Repository<FarmingCalender>,
    @Inject(Service.LAND_SERVICE)
    private readonly landService: ILandService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }
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

  //   const land = await this.landService.getLandByIdNoRelation(landId);

  //   if (!land) throw new NotFoundException({
  //     message:
  //       ['Vùng canh tác này không tồn tại vui lòng kiểm tra lại !']

  //   })
  //   const checkingExists = await this.checkUserExistsWithFarm(landId, users);
  //   if (!checkingExists) throw new ConflictException('Some users already exist in a farming calendar for the specified land.');


  //   const calender = this.farmingCalenderRepository.create({
  //     ...dto,
  //     users,
  //     land
  //   });

  //   return await this.farmingCalenderRepository.save(calender);
  // }
  async createFarmingCalender(landId: string, dto: CreateFarmingCalenderDto, user: User): Promise<FarmingCalender | any> {
    const userIds = dto.users;
    const errors = [];
    const validatedUserIds = [];
    const users = [];
    for (const userId of userIds) {
      try {
        const user = await this.userRepository.findOne({
          where: { id: userId },
          select: ['id', 'fullName']
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

    const land = await this.landService.getLandByIdNoRelation(landId);

    if (!land) throw new NotFoundException({
      message:
        ['Vùng canh tác này không tồn tại vui lòng kiểm tra lại !']

    })
    const checkingExists = await this.checkUserExistsWithFarm(landId, users);
    if (!checkingExists) throw new ConflictException('Some users already exist in a farming calendar for the specified land.');


    const calender = this.farmingCalenderRepository.create({
      ...dto,
      users,
      land
    });

    return await this.farmingCalenderRepository.save(calender);
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

  async getAllFarmingCalenders(): Promise<FarmingCalender[]> {
    return await this.farmingCalenderRepository.find();
  }

  async getFarmingCalenderById(id: string): Promise<FarmingCalender> {
    const farming_calender = await this.farmingCalenderRepository.findOne({
      where: {
        id
      }
    });
    if (!farming_calender) {
      throw new NotFoundException("Không tìm thấy lịch canh tác này !");
    }
    return farming_calender;
  }

  async updateFarmingCalender(id: string, data: UpdateFarmingCalenderDto, user: User): Promise<FarmingCalender | any> {
    const farmingCalender = await this.farmingCalenderRepository.findOne({
      where: {
        id
      },
      relations: ['land', 'users']
    });

    if (!farmingCalender) {
      throw new NotFoundException('Lịch canh tác không tồn tại.');
    }
    return farmingCalender
    //chưa xong
    // try {
    //   const farming_calender = await this.getFarmingCalenderById(id);
    //   const merged = this.farmingCalenderRepository.merge(farming_calender,data);
    //   return await this.farmingCalenderRepository.save(merged);
    // } catch (error) {
    //   throw new BadRequestException({
    //     message: [error.message]
    //   });
    // }
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
