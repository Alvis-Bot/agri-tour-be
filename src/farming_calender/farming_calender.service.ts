import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFarmingCalenderDto } from '../common/dto/create-farming_calender.dto';
import { UpdateFarmingCalenderDto } from 'src/common/dto/update-farming_calender.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FarmingCalender } from 'src/common/entities/farming_calender.entity';
import { Repository } from 'typeorm';


@Injectable()
export class FarmingCalenderService {
  constructor(
    @InjectRepository(FarmingCalender)
    private readonly farmingCalenderRepository: Repository<FarmingCalender>,
  ) { }
  async createFarmingCalender(data: CreateFarmingCalenderDto): Promise<FarmingCalender|any> {
    // const farmingCalender = this.farmingCalenderRepository.create(data);
    // return await this.farmingCalenderRepository.save(farmingCalender);
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

  async updateFarmingCalender(id: string, data: UpdateFarmingCalenderDto): Promise<FarmingCalender|any> {
    
    //  await this.getFarmingCalenderById(id);
    //  await this.farmingCalenderRepository.update(id, data);
  }

  async deleteFarmingCalender(id: string): Promise<void> {
    await this.farmingCalenderRepository.delete(id);
  }
}
