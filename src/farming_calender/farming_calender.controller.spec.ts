import { Test, TestingModule } from '@nestjs/testing';
import { FarmingCalenderController } from './farming_calender.controller';
import { FarmingCalenderService } from './farming_calender.service';

describe('FarmingCalenderController', () => {
  let controller: FarmingCalenderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FarmingCalenderController],
      providers: [FarmingCalenderService],
    }).compile();

    controller = module.get<FarmingCalenderController>(FarmingCalenderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
