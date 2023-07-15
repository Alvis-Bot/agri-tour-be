import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Group } from "../common/entities/group.entity";
import { PermissionModule } from "../permission/permission.module";
import { FeatureModule } from "../feature/feature.module";
import { Permission } from "../common/entities/permission.entity";
import { User } from 'src/common/entities/user.entity';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/service/user.service';
import { Farm } from 'src/common/entities/farm.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Group ,Permission,User,Farm]) ,PermissionModule , FeatureModule],
  providers: [GroupService,UserService],
  controllers: [GroupController],
  exports: [GroupService]
})
export class GroupModule {}
