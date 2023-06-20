import { Module } from '@nestjs/common';
import { FeatureService } from './service/feature.service';
import { FeatureController } from './feature.controller';
import { Service } from "../common/enum/service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Feature } from "../common/entities/feature.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Feature])],
  providers: [{
    provide: Service.FEATURE_SERVICE,
    useClass: FeatureService
  }],
  controllers: [FeatureController],
  exports: [Service.FEATURE_SERVICE]
})
export class FeatureModule {}
