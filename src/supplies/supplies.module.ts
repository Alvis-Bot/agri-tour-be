import { Module } from '@nestjs/common';
import { SuppliesService } from './supplies.service';
import { SuppliesController } from './supplies.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Supplies} from "../common/entities/supplies.entity";

@Module({
  imports: [
      TypeOrmModule.forFeature([Supplies])
  ],
  providers: [SuppliesService],
  controllers: [SuppliesController]
})
export class SuppliesModule {}
