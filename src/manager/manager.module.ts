import { Module } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { ManagerController } from './manager.controller';
import { Service } from "../common/enum/service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Permission } from "../common/entities/permission.entity";
import { UserModule } from "../user/user.module";
import { GroupModule } from "../group/group.module";
@Module({
  imports: [UserModule , GroupModule],
  providers: [ManagerService],
  controllers: [ManagerController]
})
export class ManagerModule {}
