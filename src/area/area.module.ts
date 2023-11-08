import { Module,Global } from '@nestjs/common';
import { AreaController } from './area.controller';
import { AreaService } from "./area.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Area } from "../common/entities/area.entity";
import { FarmModule } from "../farm/farm.module";

@Global()
@Module({
  imports: [
    FarmModule,TypeOrmModule.forFeature([Area])],
  controllers: [AreaController],
  providers: [AreaService],
  exports: [AreaService]
})
export class AreaModule {}
