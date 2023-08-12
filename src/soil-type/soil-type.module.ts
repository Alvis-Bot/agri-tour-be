import {  Module } from "@nestjs/common";
import { SoilTypeService } from './soil-type.service';
import { SoilTypeController } from './soil-type.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { SoilType } from "../common/entities/soil-type.entity";

// @Global()
@Module({
  imports: [TypeOrmModule.forFeature([SoilType])],
  providers: [SoilTypeService],
  controllers: [SoilTypeController],
  exports: [SoilTypeService]
})
export class SoilTypeModule {}
