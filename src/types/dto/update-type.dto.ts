import { PartialType } from '@nestjs/swagger';
import { TypeCreateDto } from './type-create.dto';

export class UpdateTypeDto extends PartialType(TypeCreateDto) {}
