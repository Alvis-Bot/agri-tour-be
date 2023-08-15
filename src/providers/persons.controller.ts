import { Body, Controller, Delete, Get, Patch, Post, Query } from '@nestjs/common';
import { PersonsService } from './persons.service';
import { CreatePersonDto } from '../common/dto/create-person.dto';
import { Pagination } from 'src/common/pagination/pagination.dto';
import { ApiTags } from '@nestjs/swagger';
import { UpdatePersonDto } from 'src/common/dto/update-person.dto';
import { PersonEntity } from 'src/common/entities/person.entity';
import { UUIDQuery } from "../common/decorator/uuid.decorator";
import { Note } from "../common/decorator/description.decorator";
import { QueryTypeDTO } from 'src/types/dto/queryType.dto';

@ApiTags('APIs NCC,KH,DOITUONG')
@Controller('persons')
export class PersonsController {
  constructor(private readonly PersonsService: PersonsService) { }

  @Post()
  @Note('Tạo mới nhà cung cấp, Khách hàng, đối tượng khác')
  async create(@Query() { type }: QueryTypeDTO, @Body() dto: CreatePersonDto): Promise<PersonEntity> {
    return this.PersonsService.createPerson(dto, type);
  }

  @Get()
  @Note('Lấy danh sách nhà cung cấp')
  async getPaginationPersons(@Query() pagination: Pagination) {
    return await this.PersonsService.getPaginationPersons(pagination);
  }

  @Get('getsByType')
  @Note('Lấy danh sách theo loại')
  async getPersonByType(@Query() { type }: QueryTypeDTO, @Query() pagination: Pagination) {
    return await this.PersonsService.getPersonsByType(type,pagination);
  }
  @Get('get')
  @Note('Lấy thông tin nhà cung cấp theo id')
  async getPersonById(@UUIDQuery('id') id: string) {
    return this.PersonsService.getPersonById(id);
  }

  @Patch('update')
  @Note('Cập nhật thông tin nhà cung cấp')
  async update(@UUIDQuery('id') id: string, @Body() dto: UpdatePersonDto): Promise<PersonEntity> {
    return await this.PersonsService.updatePerson(id, dto);
  }

  @Delete('delete')
  @Note('Xóa nhà cung cấp')
  async remove(@UUIDQuery('id') id: string): Promise<void> {
    await this.PersonsService.removePerson(id);
  }
}
