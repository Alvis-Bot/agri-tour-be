import { Test, TestingModule } from '@nestjs/testing';
import { MemberShipTypeController } from './member-ship-type.controller';
import { MemberShipTypeService } from './member-ship-type.service';

describe('MemberShipTypeController', () => {
  let controller: MemberShipTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MemberShipTypeController],
      providers: [MemberShipTypeService],
    }).compile();

    controller = module.get<MemberShipTypeController>(MemberShipTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
