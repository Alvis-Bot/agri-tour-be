import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { FarmModule } from './farm/farm.module';
import { AreaModule } from './area/area.module';
import { LandModule } from './land/land.module';
import { AppController } from './app.controller';
import { CategoriesModule } from './categories/categories.module';
import { FarmingCalenderModule } from './farming_calender/farming_calender.module';
import { CategoryDetailsModule } from './category-details/category-details.module';
import { TypesModule } from './types/types.module';
import { PersonsModule } from './providers/persons.module';
import { validationSchema } from "./common/config/validation";
import { addTransactionalDataSource } from "typeorm-transactional";
import { DataSource } from "typeorm";
import { StorageModule } from "./storage/storage.module";
import { CropsModule } from './crops/crops.module';
import { WorkOfDayModule } from './work-of-day/work-of-day.module';
import { MaterialModule } from './material/material.module';
import { BillRequestModule } from './bill-request/bill-request.module';
import { VisitorModule } from './visitor/visitor.module';
import { IngredientsModule } from './ingredients/ingredients.module';
import { AgriculturalProductsModule } from './agricultural-products/agricultural-products.module';
import { CareScheduleModule } from './care-schedule/care-schedule.module';
import { HarvestModule } from './harvest/harvest.module';
import { StatisticsModule } from './statistics/statistics.module';
import { ContactModule } from './contact/contact.module';
import { MemberShipTypeModule } from './member-ship-type/member-ship-type.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env`, `.env.${process.env.NODE_ENV}`], // load env
      isGlobal: true,
      validationSchema,
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
    PersonsModule,
    CropsModule,
    WorkOfDayModule,
    MaterialModule,
    BillRequestModule,
    VisitorModule,
    IngredientsModule,
    AgriculturalProductsModule,
    CareScheduleModule,
    HarvestModule,
    StatisticsModule,
    ContactModule,
    MemberShipTypeModule,
  ],
  controllers: [AppController]
})
export class AppModule { }
