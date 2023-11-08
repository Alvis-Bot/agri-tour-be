import { Module, Global } from '@nestjs/common';
import { HarvestService } from './harvest.service';
import { HarvestController } from './harvest.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Harvest } from 'src/common/entities/harvest.entity';
import { LandModule } from 'src/land/land.module';
import { CropsModule } from 'src/crops/crops.module';
@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Harvest]), LandModule, CropsModule],
  controllers: [HarvestController],
  providers: [HarvestService],
  exports: [HarvestService]
})
export class HarvestModule { }
