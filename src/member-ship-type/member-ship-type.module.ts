import { Module } from '@nestjs/common';
import { MemberShipTypeService } from './member-ship-type.service';
import { MemberShipTypeController } from './member-ship-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberShipType } from './entities/member-ship-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MemberShipType])],
  controllers: [MemberShipTypeController],
  providers: [MemberShipTypeService],
  exports: [MemberShipTypeService]
})
export class MemberShipTypeModule { }
