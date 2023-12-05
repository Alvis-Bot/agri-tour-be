import { PartialType } from '@nestjs/swagger';
import { CreateMemberShipTypeDto } from './create-member-ship-type.dto';

export class UpdateMemberShipTypeDto extends PartialType(CreateMemberShipTypeDto) {}
