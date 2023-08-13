import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Group } from "../common/entities/group.entity";
import { User } from 'src/common/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Farm } from 'src/common/entities/farm.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Group,User,Farm])],
  providers: [GroupService,UserService],
  controllers: [GroupController],
  exports: [GroupService]
})
export class GroupModule {}
