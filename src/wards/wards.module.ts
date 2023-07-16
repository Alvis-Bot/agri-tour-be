import { Module } from '@nestjs/common';
import { WardsService } from './wards.service';
import { WardsController } from './wards.controller';
import { Ward } from 'src/common/entities/ward.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([Ward])],
  controllers: [WardsController],
  providers: [WardsService]
})
export class WardsModule {}
