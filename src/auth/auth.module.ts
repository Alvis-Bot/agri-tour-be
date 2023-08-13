import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserModule } from "../user/user.module";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./strategy/local.strategy";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { Service } from "../common/enum/service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../common/entities/user.entity";
import { JwtConfigModule } from "./jwt/jwt.module";
import { JwtRefreshStrategy } from "./strategy/jwt.refresh.strategy";

@Module({
  imports: [UserModule, PassportModule,
    TypeOrmModule.forFeature([User]),
    JwtConfigModule],
  providers: [{
    provide: Service.AUTH_SERVICE,
    useClass: AuthService
  }, LocalStrategy, JwtStrategy, JwtRefreshStrategy],
  controllers: [AuthController],
  exports: [AuthModule]
})
export class AuthModule {
}
