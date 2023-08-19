import { Test, TestingModule } from '@nestjs/testing';
import { WorkOfDayController } from './work-of-day.controller';
import { WorkOfDayService } from './work-of-day.service';

describe('WorkOfDayController', () => {
  let controller: WorkOfDayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkOfDayController],
      providers: [WorkOfDayService],
    }).compile();

    controller = module.get<WorkOfDayController>(WorkOfDayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
