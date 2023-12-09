import { PartialType } from '@nestjs/swagger';
import { CreateBillRequestDto } from './create-bill-request.dto';

export class UpdateBillRequestDto extends PartialType(CreateBillRequestDto) {}
