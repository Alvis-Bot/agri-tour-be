import { Module } from '@nestjs/common';
import { CropsService } from './crops.service';
import { CropsController } from './crops.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Crop } from "../common/entities/crop.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Crop])
  ],
  providers: [CropsService],
  controllers: [CropsController],
  exports: [CropsService]
})
export class CropsModule { }
