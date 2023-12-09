import { Test, TestingModule } from '@nestjs/testing';
import { BillRequestController } from './bill-request.controller';
import { BillRequestService } from './bill-request.service';

describe('BillRequestController', () => {
  let controller: BillRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BillRequestController],
      providers: [BillRequestService],
    }).compile();

    controller = module.get<BillRequestController>(BillRequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
