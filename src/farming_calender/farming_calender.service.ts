import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFarmingCalenderDto } from '../common/dto/create-farming_calender.dto';
import { UpdateFarmingCalenderDto } from 'src/common/dto/update-farming_calender.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FarmingCalender } from 'src/common/entities/farming_calender.entity';
import { Repository } from 'typeorm';
import { Land } from 'src/common/entities/land.entity';
import { User } from 'src/common/entities/user.entity';


@Injectable()
export class FarmingCalenderService {
  constructor(
    @InjectRepository(FarmingCalender)
    private readonly farmingCalenderRepository: Repository<FarmingCalender>,
    @InjectRepository(Land)
    private readonly landRepository: Repository<Land>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }
  async createFarmingCalender(data: CreateFarmingCalenderDto): Promise<FarmingCalender | any> {
    try {
      const land = await this.landRepository.findOne({
        where: {
          id: data.landId
        }, select: ['id']
      })
      if (!land) throw new NotFoundException('Vùng đất không tồn tại!');
      const user = await this.userRepository.findOne({ where: { id: data.userId }, select: ['id'] });
      if (!user) throw new NotFoundException('User không tồn tại hoặc bị khoá!');

      const creating = this.farmingCalenderRepository.create({
        ...data,
        user,
        land
      })
      return await this.farmingCalenderRepository.save(creating);
    } catch (error) {
      throw new BadRequestException({
        message: [error.message]
      });
    }
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
