import { Global, Module } from "@nestjs/common";
import { SoilTypeService } from './service/soil-type.service';
import { SoilTypeController } from './soil-type.controller';
import { Service } from "../common/enum/service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SoilType } from "../common/entities/soil-type.entity";

// @Global()
@Module({
  imports: [TypeOrmModule.forFeature([SoilType])],
  providers: [{
    provide: Service.SOIL_TYPE_SERVICE,
    useClass: SoilTypeService
  }],
  controllers: [SoilTypeController],
  exports: [Service.SOIL_TYPE_SERVICE]
})
export class SoilTypeModule {}
