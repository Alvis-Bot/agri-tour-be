import { Test, TestingModule } from '@nestjs/testing';
import { CareScheduleController } from './care-schedule.controller';
import { CareScheduleService } from './care-schedule.service';

describe('CareScheduleController', () => {
  let controller: CareScheduleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CareScheduleController],
      providers: [CareScheduleService],
    }).compile();

    controller = module.get<CareScheduleController>(CareScheduleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
