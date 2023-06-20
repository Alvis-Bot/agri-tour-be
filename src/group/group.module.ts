import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Group } from "../common/entities/group.entity";
import { PermissionModule } from "../permission/permission.module";
import { FeatureModule } from "../feature/feature.module";
import { Permission } from "../common/entities/permission.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Group ,Permission]) ,PermissionModule , FeatureModule],
  providers: [GroupService],
  controllers: [GroupController],
  exports: [GroupService]
})
export class GroupModule {}
