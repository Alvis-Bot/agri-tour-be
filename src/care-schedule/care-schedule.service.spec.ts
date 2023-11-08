import { Test, TestingModule } from '@nestjs/testing';
import { CareScheduleService } from './care-schedule.service';

describe('CareScheduleService', () => {
  let service: CareScheduleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CareScheduleService],
    }).compile();

    service = module.get<CareScheduleService>(CareScheduleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
