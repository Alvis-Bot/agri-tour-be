import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserController } from './user.controller';
import { Service } from "../common/enum/service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../common/entities/user.entity";
import { Permission } from "../common/entities/permission.entity";
import { Farm } from "../common/entities/farm.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User , Permission , Farm])],
  providers: [{
    provide: Service.USER_SERVICE,
    useClass: UserService
  }],
  controllers: [UserController],
  exports: [Service.USER_SERVICE]
})
export class UserModule {}
