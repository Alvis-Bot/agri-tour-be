import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
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
  async createFarmingCalender(landId: string, dto: CreateFarmingCalenderDto, user: User): Promise<FarmingCalender> {
    const land = await this.landService.getLandById(landId);
    const calender = this.farmingCalenderRepository.create({
      ...dto,
      user,
      land
    });
    return await this.farmingCalenderRepository.save(calender);
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

  async updateFarmingCalender(id: string, data: UpdateFarmingCalenderDto): Promise<FarmingCalender | any> {

    try {
      const farming_calender = await this.getFarmingCalenderById(id);
      const merged = this.farmingCalenderRepository.merge(farming_calender, data)
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
