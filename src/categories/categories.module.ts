import { Module } from '@nestjs/common';
import { CategoryController } from './categories.controller';
import { CategoryService } from './categories.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Type } from 'src/types/entities/type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Type])],
  controllers: [CategoryController],
  providers: [CategoryService]
})
export class CategoriesModule { }
