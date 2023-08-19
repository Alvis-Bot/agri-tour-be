import { Test, TestingModule } from '@nestjs/testing';
import { WorkOfDayService } from './work-of-day.service';

describe('WorkOfDayService', () => {
  let service: WorkOfDayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkOfDayService],
    }).compile();

    service = module.get<WorkOfDayService>(WorkOfDayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
