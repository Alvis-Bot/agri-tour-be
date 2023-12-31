import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from "../user/user.module";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./strategy/local.strategy";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { IAuthService } from "./auth";
import { Service } from "../common/enum/service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Permission } from "../common/entities/permission.entity";
import { User } from "../common/entities/user.entity";

@Module({
  imports: [UserModule, PassportModule,
    TypeOrmModule.forFeature([Permission, User]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),],
  providers: [{
    provide: Service.AUTH_SERVICE,
    useClass: AuthService
  }, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule { }
