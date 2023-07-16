import { Module } from '@nestjs/common';
import { BusinessModelService } from './business_model.service';
import { BusinessModelController } from './business_model.controller';

@Module({
  controllers: [BusinessModelController],
  providers: [BusinessModelService]
})
export class BusinessModelModule {}
