import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../common/entities/user.entity";
import { Permission } from "../common/entities/permission.entity";
import { Farm } from "../common/entities/farm.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User, Permission, Farm])],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule { }
