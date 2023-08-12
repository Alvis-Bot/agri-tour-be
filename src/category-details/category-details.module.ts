import { Module } from '@nestjs/common';
import { CategoryDetailsService } from './category-details.service';
import { CategoryDetailsController } from './category-details.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/categories/entities/category.entity';
import { Type } from 'src/types/entities/type.entity';
import {CategoryDetails} from "../common/entities/category-detail.entity";

@Module({
  imports: [TypeOrmModule.forFeature([CategoryDetails, Category, Type])],
  controllers: [CategoryDetailsController],
  providers: [CategoryDetailsService]
})
export class CategoryDetailsModule { }
