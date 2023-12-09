import { Module } from '@nestjs/common';
import { CareScheduleService } from './care-schedule.service';
import { CareScheduleController } from './care-schedule.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CareSchedule } from 'src/common/entities/care-schedule.entity';
import { LandService } from 'src/land/land.service';
import { CropsService } from 'src/crops/crops.service';
import { Land } from 'src/common/entities/land.entity';
import { Crop } from 'src/common/entities/crop.entity';
import { AreaService } from 'src/area/area.service';
import { AreaModule } from 'src/area/area.module';
import { CategoriesModule } from 'src/categories/categories.module';
import { CategoryDetailsModule } from 'src/category-details/category-details.module';
import { CategoryDetails } from 'src/common/entities/category-detail.entity';
import { LandModule } from 'src/land/land.module';
import { CropsModule } from 'src/crops/crops.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CareSchedule]),
    AreaModule,
    CategoriesModule,
    CategoryDetailsModule,
    LandModule,
    CropsModule

  ],
  controllers: [CareScheduleController],
  providers: [CareScheduleService],
  exports: [CareScheduleService]
})
export class CareScheduleModule { }
