import { PartialType } from '@nestjs/swagger';
import { CreateWorkOfDayDto } from './create-work-of-day.dto';

export class UpdateWorkOfDayDto extends PartialType(CreateWorkOfDayDto) {}
