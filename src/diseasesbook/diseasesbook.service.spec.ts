import { Test, TestingModule } from '@nestjs/testing';
import { DiseasesbookService } from './diseasesbook.service';

describe('DiseasesbookService', () => {
  let service: DiseasesbookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiseasesbookService],
    }).compile();

    service = module.get<DiseasesbookService>(DiseasesbookService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
