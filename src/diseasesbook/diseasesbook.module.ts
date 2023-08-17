import { Module } from '@nestjs/common';
import { DiseasesbookService } from './diseasesbook.service';
import { DiseasesbookController } from './diseasesbook.controller';

@Module({
  controllers: [DiseasesbookController],
  providers: [DiseasesbookService],
})
export class DiseasesbookModule {}
