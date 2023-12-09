import { Test, TestingModule } from '@nestjs/testing';
import { MemberShipTypeService } from './member-ship-type.service';

describe('MemberShipTypeService', () => {
  let service: MemberShipTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MemberShipTypeService],
    }).compile();

    service = module.get<MemberShipTypeService>(MemberShipTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
