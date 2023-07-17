import { Injectable } from '@nestjs/common';
import { CreateFarmingCalenderDto } from '../common/dto/create-farming_calender.dto';
import { UpdateFarmingCalenderDto } from 'src/common/dto/update-farming_calender.dto';


@Injectable()
export class FarmingCalenderService {
  create(createFarmingCalenderDto: CreateFarmingCalenderDto) {
    return 'This action adds a new farmingCalender';
  }

  findAll() {
    return `This action returns all farmingCalender`;
  }

  findOne(id: number) {
    return `This action returns a #${id} farmingCalender`;
  }

  update(id: number, updateFarmingCalenderDto: UpdateFarmingCalenderDto) {
    return `This action updates a #${id} farmingCalender`;
  }

  remove(id: number) {
    return `This action removes a #${id} farmingCalender`;
  }
}
