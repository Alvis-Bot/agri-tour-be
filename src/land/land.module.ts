import {Module} from '@nestjs/common';
import {LandService} from './land.service';
import {LandController} from './land.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Land} from "../common/entities/land.entity";
import {AreaModule} from "../area/area.module";
import {SoilTypeModule} from "../soil-type/soil-type.module";
import {CategoryDetails} from "../common/entities/category-detail.entity";

@Module({
  imports: [
    AreaModule, SoilTypeModule, TypeOrmModule.forFeature([Land, CategoryDetails])],
  providers: [LandService],
  controllers: [LandController],
  exports: [LandService]
})
export class LandModule { }
