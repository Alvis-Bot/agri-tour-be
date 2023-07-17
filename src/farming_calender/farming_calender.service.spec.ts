import { Test, TestingModule } from '@nestjs/testing';
import { FarmingCalenderService } from './farming_calender.service';

describe('FarmingCalenderService', () => {
  let service: FarmingCalenderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FarmingCalenderService],
    }).compile();

    service = module.get<FarmingCalenderService>(FarmingCalenderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
