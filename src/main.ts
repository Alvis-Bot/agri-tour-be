import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CorsConfig } from './common/config/cors.config';
import { SwaggerConfig } from './common/config/swagger.config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { HttpExceptionFilter } from './exception/http-exception.filter';
import { initializeTransactionalContext } from 'typeorm-transactional';

async function bootstrap() {
  // Initialize the transactional context
  initializeTransactionalContext();

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true,
  });
  app.useBodyParser('json', { limit: '10mb' });

  const configService = app.get(ConfigService);
  app.setGlobalPrefix('api', { exclude: [''] });
  CorsConfig.enableCors(app);
  SwaggerConfig.init(app);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
        //nếu field có giá trị '' thì sẽ bị bỏ qua
      },
    }),
  );

  // app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
  // cấu hình Serialization global nestjs class-transforms để ẩn các dữ liệu nhảy cảm truớc khi gửi về cho khách
  // -----  không được gửi password về
  // -----  @Exclude() trong entity
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  // Sử dụng middleware express.static để phục vụ các tệp tĩnh
  app.useStaticAssets(join(__dirname, '..', 'public')); // cấu hình thư mục chứa tài nguyên tĩnh
  app.setBaseViewsDir(join(__dirname, '..', 'views')); // cấu hình thư mục chứa các view template
  app.setViewEngine('hbs'); // cấu hình view engine sử dụng Handlebars
  await app.listen(configService.get('PORT'), () => {
    Logger.log(
      `Listening at http://localhost:${configService.get<number>('PORT')}`,
    );
    Logger.log(
      `Document Listening at http://localhost:${configService.get<number>(
        'PORT',
      )}/api`,
    );
    Logger.log(
      'Running in environment ' + configService.get<string>('NODE_ENV'),
    );
  });
}

bootstrap().then(() => Logger.log("Server started"));
