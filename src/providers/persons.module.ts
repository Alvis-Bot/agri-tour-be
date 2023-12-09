import { Module } from '@nestjs/common';
import { PersonsService } from './persons.service';
import { PersonsController } from './persons.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonEntity } from '../common/entities/person.entity';
import { Type } from 'src/common/entities/type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PersonEntity, Type])],
  controllers: [PersonsController],
  providers: [PersonsService],
  exports: [PersonsService]
})
export class PersonsModule { }
