import { Controller, Get, Post, Body, Patch, Query, Delete } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Pagination } from 'src/common/pagination/pagination.dto';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) { }

  @Post('create')
  async create(@Body() createContactDto: CreateContactDto) {
    return this.contactService.create(createContactDto);
  }

  @Get()
  async findAll(@Query() pagination: Pagination) {
    return this.contactService.findAll(pagination);
  }

  @Get('get')
  async findOne(@Query('id') id: string) {
    return this.contactService.findOne(id);
  }

  @Patch('update')
  async update(@Query('id') id: string, @Body() updateContactDto: UpdateContactDto) {
    return this.contactService.update(id, updateContactDto);
  }

  @Delete('delete')
  async remove(@Query('id') id: string) {
    return this.contactService.remove(id);
  }
}
