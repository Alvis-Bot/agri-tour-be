import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MemberShipTypeService } from './member-ship-type.service';
import { CreateMemberShipTypeDto } from './dto/create-member-ship-type.dto';
import { UpdateMemberShipTypeDto } from './dto/update-member-ship-type.dto';
import { BaseController } from 'src/base/base.controller';
import { MemberShipType } from './entities/member-ship-type.entity';
import { ApiTags } from '@nestjs/swagger';

@Controller('member-ship-type')
@ApiTags("API Loại thành viên")
export class MemberShipTypeController extends BaseController<MemberShipType>{
  constructor(private readonly memberShipTypeService: MemberShipTypeService) { super(memberShipTypeService) }

}
