import {Global, Module} from '@nestjs/common';
import { CategoryDetailsService } from './category-details.service';
import { CategoryDetailsController } from './category-details.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/common/entities/category.entity';
import { Type } from 'src/common/entities/type.entity';
import {CategoryDetails} from "../common/entities/category-detail.entity";

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([CategoryDetails, Category, Type])],
  controllers: [CategoryDetailsController],
  providers: [CategoryDetailsService],
  exports: [CategoryDetailsService]
})
export class CategoryDetailsModule { }
