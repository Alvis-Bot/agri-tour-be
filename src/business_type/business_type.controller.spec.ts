import { Test, TestingModule } from '@nestjs/testing';
import { BusinessTypeController } from './business_type.controller';
import { BusinessTypeService } from './business_type.service';

describe('BusinessTypeController', () => {
  let controller: BusinessTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BusinessTypeController],
      providers: [BusinessTypeService],
    }).compile();

    controller = module.get<BusinessTypeController>(BusinessTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
