import { Module } from '@nestjs/common';
import { FarmingCalenderService } from './farming_calender.service';
import { FarmingCalenderController } from './farming_calender.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FarmingCalender } from 'src/common/entities/farming_calender.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigModule } from 'src/auth/jwt/jwt.module';

@Module({
  imports:[TypeOrmModule.forFeature([FarmingCalender]),JwtConfigModule],
  controllers: [FarmingCalenderController],
  providers: [FarmingCalenderService],
  exports:[FarmingCalenderService]
})
export class FarmingCalenderModule {}
