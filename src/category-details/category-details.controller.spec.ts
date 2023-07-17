import { Test, TestingModule } from '@nestjs/testing';
import { CategoryDetailsController } from './category-details.controller';
import { CategoryDetailsService } from './category-details.service';

describe('CategoryDetailsController', () => {
  let controller: CategoryDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryDetailsController],
      providers: [CategoryDetailsService],
    }).compile();

    controller = module.get<CategoryDetailsController>(CategoryDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
