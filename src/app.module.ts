import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {UserModule} from './user/user.module';
import {AuthModule} from './auth/auth.module';
import {GroupModule} from './group/group.module';
import {FarmModule} from './farm/farm.module';
import {AreaModule} from './area/area.module';
import {LandModule} from './land/land.module';
import {SoilTypeModule} from './soil-type/soil-type.module';
import {AppController} from './app.controller';
import {RoleModule} from './role/role.module';
import {AbilityModule} from './ability/ability.module';
import {JwtConfigModule} from './auth/jwt/jwt.module';
import {CategoriesModule} from './categories/categories.module';
import {FarmingCalenderModule} from './farming_calender/farming_calender.module';
import {CategoryDetailsModule} from './category-details/category-details.module';
import {TypesModule} from './types/types.module';
import {ProvidersModule} from './providers/providers.module';
import {validationSchema} from "./common/config/validation";
import {addTransactionalDataSource} from "typeorm-transactional";
import {DataSource} from "typeorm";
import {StorageModule} from "./storage/storage.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema,
        envFilePath: [`.env`, `.env.${process.env.NODE_ENV}`], // load env
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
          logging: true,
          autoLoadEntities: false,
        };
      },
      async dataSourceFactory(options) {
        if (!options) {
          throw new Error('Invalid options passed');
        }
        return addTransactionalDataSource(new DataSource(options));
      },
    }),
    UserModule,
    AuthModule,
    StorageModule,
    GroupModule,
    AreaModule,
    FarmModule,
    LandModule,
    SoilTypeModule,
    RoleModule,
    AbilityModule,
    JwtConfigModule,
    CategoriesModule,
    FarmingCalenderModule,
    CategoryDetailsModule,
    TypesModule,
    ProvidersModule,
  ],
  controllers:[AppController]
})
export class AppModule {}
