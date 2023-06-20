import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Permission } from "../common/entities/permission.entity";
import { PermissionController } from './permission.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Permission])],
  providers: [PermissionService],
  exports: [PermissionService],
  controllers: [PermissionController]
})
export class PermissionModule {}
