import { PartialType } from '@nestjs/swagger';
import { CreateBusinessModelDto } from './create-business_model.dto';

export class UpdateBusinessModelDto extends PartialType(CreateBusinessModelDto) {}
