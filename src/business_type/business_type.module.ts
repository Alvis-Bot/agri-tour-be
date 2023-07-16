import { Module } from '@nestjs/common';
import { BusinessTypeService } from './business_type.service';
import { BusinessTypeController } from './business_type.controller';

@Module({
  controllers: [BusinessTypeController],
  providers: [BusinessTypeService]
})
export class BusinessTypeModule {}
