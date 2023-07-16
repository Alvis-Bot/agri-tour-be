import { Test, TestingModule } from '@nestjs/testing';
import { BusinessModelService } from './business_model.service';

describe('BusinessModelService', () => {
  let service: BusinessModelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusinessModelService],
    }).compile();

    service = module.get<BusinessModelService>(BusinessModelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
