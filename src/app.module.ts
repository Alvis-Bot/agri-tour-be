import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {UserModule} from './user/user.module';
import {AuthModule} from './auth/auth.module';
import {FarmModule} from './farm/farm.module';
import {AreaModule} from './area/area.module';
import {LandModule} from './land/land.module';
import {AppController} from './app.controller';
import {CategoriesModule} from './categories/categories.module';
import {FarmingCalenderModule} from './farming_calender/farming_calender.module';
import {CategoryDetailsModule} from './category-details/category-details.module';
import {TypesModule} from './types/types.module';
import {ProvidersModule} from './providers/persons.module';
import {validationSchema} from "./common/config/validation";
import {addTransactionalDataSource} from "typeorm-transactional";
import {DataSource} from "typeorm";
import {StorageModule} from "./storage/storage.module";
import { CropsModule } from './crops/crops.module';

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
          autoLoadEntities: true,
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
    AreaModule,
    FarmModule,
    LandModule,
    CategoriesModule,
    FarmingCalenderModule,
    CategoryDetailsModule,
    TypesModule,
    ProvidersModule,
    CropsModule,
  ],
  controllers:[AppController]
})
export class AppModule {}
