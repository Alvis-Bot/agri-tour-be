import { Module } from '@nestjs/common';
import { ImageService } from './service/image.service';
import { ImageController } from './image.controller';
import { Service } from "../common/enum/service";

@Module({
  providers: [{
    provide: Service.IMAGE_SERVICE,
    useClass: ImageService
  }],
  controllers: [ImageController],
  exports: [Service.IMAGE_SERVICE]
})
export class ImageModule {}
