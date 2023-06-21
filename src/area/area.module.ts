import { Module } from '@nestjs/common';
import { AreaController } from './area.controller';
import { AreaService } from "./service/area.service";
import { Service } from "../common/enum/service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Area } from "../common/entities/area.entity";
import { FarmModule } from "../farm/farm.module";


@Module({
  imports: [
    FarmModule,TypeOrmModule.forFeature([Area])],
  controllers: [AreaController],
  providers: [{
    provide: Service.AREA_SERVICE,
    useClass: AreaService
  }],
  exports: [Service.AREA_SERVICE]
})
export class AreaModule {}
