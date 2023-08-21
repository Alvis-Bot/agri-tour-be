import { Test, TestingModule } from '@nestjs/testing';
import { BillRequestService } from './bill-request.service';

describe('BillRequestService', () => {
  let service: BillRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BillRequestService],
    }).compile();

    service = module.get<BillRequestService>(BillRequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
