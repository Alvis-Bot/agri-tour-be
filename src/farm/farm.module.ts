import { Module } from '@nestjs/common';
import { FarmController } from './farm.controller';
import { FarmService } from './farm.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Farm } from "../common/entities/farm.entity";

import { JwtConfigModule } from 'src/auth/jwt/jwt.module';
import { User } from 'src/common/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Farm,User]),JwtConfigModule],
  controllers: [FarmController],
  providers: [FarmService],
  exports: [FarmService]
})
export class FarmModule { }
