import { Module } from '@nestjs/common';
import { FarmController } from './farm.controller';
import { FarmService } from './service/farm.service';
import { Service } from "../common/enum/service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Farm } from "../common/entities/farm.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Farm])],
  controllers: [FarmController],
  providers: [{
    provide: Service.FARM_SERVICE,
    useClass: FarmService
  }],
  exports: [Service.FARM_SERVICE]
})
export class FarmModule {}
