import { Module } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { IngredientsController } from './ingredients.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Ingredient} from "../common/entities/ingredient.entity";

@Module({
  imports: [
      TypeOrmModule.forFeature([Ingredient])
  ],
  providers: [IngredientsService],
  controllers: [IngredientsController]
})
export class IngredientsModule {}
