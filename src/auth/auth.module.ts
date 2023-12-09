import { Global, Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserModule } from "../user/user.module";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./strategy/local.strategy";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../common/entities/user.entity";
import { JwtRefreshStrategy } from "./strategy/jwt.refresh.strategy";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";


@Global()
@Module({
  imports: [
    UserModule,
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1y' },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User])],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtRefreshStrategy],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {
}
