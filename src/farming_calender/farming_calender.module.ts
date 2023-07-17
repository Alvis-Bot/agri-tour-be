import { Module } from '@nestjs/common';
import { FarmingCalenderService } from './farming_calender.service';
import { FarmingCalenderController } from './farming_calender.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FarmingCalender } from 'src/common/entities/farming_calender.entity';

@Module({
  imports:[TypeOrmModule.forFeature([FarmingCalender])],
  controllers: [FarmingCalenderController],
  providers: [FarmingCalenderService],
  exports:[FarmingCalenderService]
})
export class FarmingCalenderModule {}
