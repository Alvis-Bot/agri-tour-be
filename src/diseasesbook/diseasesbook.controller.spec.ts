import { Test, TestingModule } from '@nestjs/testing';
import { DiseasesbookController } from './diseasesbook.controller';
import { DiseasesbookService } from './diseasesbook.service';

describe('DiseasesbookController', () => {
  let controller: DiseasesbookController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiseasesbookController],
      providers: [DiseasesbookService],
    }).compile();

    controller = module.get<DiseasesbookController>(DiseasesbookController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
