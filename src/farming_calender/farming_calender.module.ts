import { Module } from "@nestjs/common";
import { FarmingCalenderService } from "./farming_calender.service";
import { FarmingCalenderController } from "./farming_calender.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FarmingCalender } from "src/common/entities/farming_calender.entity";
import { Land } from "src/common/entities/land.entity";
import { User } from "src/common/entities/user.entity";
import { LandModule } from "../land/land.module";
import { CategoryDetails } from "src/common/entities/category-detail.entity";
import { Category } from "src/common/entities/category.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([FarmingCalender, Land, User,CategoryDetails,Category]),
    LandModule],
  controllers: [FarmingCalenderController],
  providers: [FarmingCalenderService],
  exports: [FarmingCalenderService]
})
export class FarmingCalenderModule {
}
