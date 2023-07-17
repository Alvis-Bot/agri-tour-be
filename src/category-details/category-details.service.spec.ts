import { Test, TestingModule } from '@nestjs/testing';
import { CategoryDetailsService } from './category-details.service';

describe('CategoryDetailsService', () => {
  let service: CategoryDetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryDetailsService],
    }).compile();

    service = module.get<CategoryDetailsService>(CategoryDetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
