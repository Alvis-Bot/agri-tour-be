import { Module } from '@nestjs/common';
import { LandService } from './service/land.service';
import { LandController } from './land.controller';
import { Service } from "../common/enum/service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Land } from "../common/entities/land.entity";
import { AreaModule } from "../area/area.module";
import { SoilType } from "../common/entities/soil-type.entity";
import { SoilTypeModule } from "../soil-type/soil-type.module";

@Module({
  imports: [
    AreaModule, SoilTypeModule
    ,TypeOrmModule.forFeature([Land])],
  providers: [{
    provide: Service.LAND_SERVICE,
    useClass: LandService
  }],
  controllers: [LandController],
  exports: [Service.LAND_SERVICE]
})
export class LandModule {}
