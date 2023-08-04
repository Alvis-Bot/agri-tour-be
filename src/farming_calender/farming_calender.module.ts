import { Module } from "@nestjs/common";
import { FarmingCalenderService } from "./farming_calender.service";
import { FarmingCalenderController } from "./farming_calender.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FarmingCalender } from "src/common/entities/farming_calender.entity";
import { JwtConfigModule } from "src/auth/jwt/jwt.module";
import { Land } from "src/common/entities/land.entity";
import { User } from "src/common/entities/user.entity";
import { LandModule } from "../land/land.module";
import { CategoryDetails } from "src/category-details/entities/category-detail.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([FarmingCalender, Land, User,CategoryDetails]),
    LandModule,
    JwtConfigModule],
  controllers: [FarmingCalenderController],
  providers: [FarmingCalenderService],
  exports: [FarmingCalenderService]
})
export class FarmingCalenderModule {
}
