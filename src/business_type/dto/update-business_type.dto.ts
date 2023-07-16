import { PartialType } from '@nestjs/swagger';
import { CreateBusinessTypeDto } from './create-business_type.dto';

export class UpdateBusinessTypeDto extends PartialType(CreateBusinessTypeDto) {}
