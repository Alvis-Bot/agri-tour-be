import { Module } from '@nestjs/common';
import { AgriculturalProductsService } from './agricultural-products.service';
import { AgriculturalProductsController } from './agricultural-products.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {AgriculturalProducts} from "../common/entities/agricultural-products.entity";
import {FarmModule} from "../farm/farm.module";

@Module({
  imports: [
      FarmModule,
      TypeOrmModule.forFeature([AgriculturalProducts])
  ],
  providers: [AgriculturalProductsService],
  controllers: [AgriculturalProductsController]
})
export class AgriculturalProductsModule {}
