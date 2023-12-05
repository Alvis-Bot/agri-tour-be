import { Injectable } from '@nestjs/common';
import { CreateMemberShipTypeDto } from './dto/create-member-ship-type.dto';
import { UpdateMemberShipTypeDto } from './dto/update-member-ship-type.dto';
import { BaseService } from 'src/base/base.service';
import { MemberShipType } from './entities/member-ship-type.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MemberShipTypeService extends BaseService<MemberShipType>{
  constructor(@InjectRepository(MemberShipType) private memberShipTypeRepository: Repository<MemberShipType>) {
    super(memberShipTypeRepository)
  }
}
