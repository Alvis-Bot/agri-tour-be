import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { addTransactionalDataSource } from "typeorm-transactional";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { validationSchema } from "./common/config/validation";
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ManagerModule } from './manager/manager.module';
import { PermissionModule } from './permission/permission.module';
import { GroupModule } from './group/group.module';
import { FeatureModule } from './feature/feature.module';
import { ImageModule } from './image/image.module';
import { FarmModule } from './farm/farm.module';
import { AreaModule } from './area/area.module';
import { LandModule } from './land/land.module';
import { SoilTypeModule } from './soil-type/soil-type.module';
import { AppController } from './app.controller';
import { RoleModule } from './role/role.module';
import { AbilityModule } from './ability/ability.module';
import { JwtConfigModule } from './auth/jwt/jwt.module';
import { BusinessModelModule } from './business_model/business_model.module';
import { BusinessTypeModule } from './business_type/business_type.module';
import { ProvincesModule } from './provinces/provinces.module';
import { DistrictModule } from './district/district.module';
import { WardsModule } from './wards/wards.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // validationSchema,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: "postgres",
          port: configService.get<number>("POSTGRES_PORT"),
          host: configService.get<string>("POSTGRES_HOST"),
          username: configService.get<string>("POSTGRES_USER"),
          password: configService.get<string>("POSTGRES_PASSWORD"),
          database: configService.get<string>("POSTGRES_DB"),
          entities: [__dirname + "/**/*.entity{.ts,.js}"],
          synchronize: true,
          logging: false,
          autoLoadEntities: true,
        };
      },
    }),
    UserModule,
    AuthModule,
    ManagerModule,
    PermissionModule,
    GroupModule,
    FeatureModule,
    ImageModule,
    AreaModule,
    FarmModule,
    LandModule,
    SoilTypeModule,
    RoleModule,
    AbilityModule,
    JwtConfigModule,
    BusinessModelModule,
    BusinessTypeModule,
    ProvincesModule,
    DistrictModule,
    WardsModule,
  ],
  controllers:[AppController]
})
export class AppModule {}
