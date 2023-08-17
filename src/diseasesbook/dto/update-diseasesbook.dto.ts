import { PartialType } from '@nestjs/swagger';
import { CreateDiseasesbookDto } from './create-diseasesbook.dto';

export class UpdateDiseasesbookDto extends PartialType(CreateDiseasesbookDto) {}
