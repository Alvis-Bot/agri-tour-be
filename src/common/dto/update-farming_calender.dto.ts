import { PartialType } from '@nestjs/swagger';
import { CreateFarmingCalenderDto } from './create-farming_calender.dto';

export class UpdateFarmingCalenderDto extends PartialType(CreateFarmingCalenderDto) {}
