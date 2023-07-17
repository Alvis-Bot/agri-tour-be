import { Module } from '@nestjs/common';
import { CategoryDetailsService } from './category-details.service';
import { CategoryDetailsController } from './category-details.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryDetails } from './entities/category-detail.entity';
import { Category } from 'src/categories/entities/category.entity';

@Module({
  imports:[TypeOrmModule.forFeature([CategoryDetails,Category])],
  controllers: [CategoryDetailsController],
  providers: [CategoryDetailsService]
})
export class CategoryDetailsModule {}
