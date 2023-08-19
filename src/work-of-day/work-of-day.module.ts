import { Global, Module } from '@nestjs/common';
import { WorkOfDayService } from './work-of-day.service';
import { WorkOfDayController } from './work-of-day.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkOfDay } from 'src/common/entities/work-of-day.entity';
import { LandService } from 'src/land/land.service';
import { LandModule } from 'src/land/land.module';
import { CropsModule } from 'src/crops/crops.module';


@Module({
  imports: [TypeOrmModule.forFeature([WorkOfDay]),
    LandModule,
    CropsModule
  ],
  controllers: [WorkOfDayController],
  providers: [WorkOfDayService],
  exports: [WorkOfDayService]
})
export class WorkOfDayModule { }
