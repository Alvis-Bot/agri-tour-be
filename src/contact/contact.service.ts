import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Contact } from './entities/contact.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Pagination } from 'src/common/pagination/pagination.dto';
import { PaginationModel } from 'src/common/pagination/pagination.model';
import { Meta } from 'src/common/pagination/meta.dto';

@Injectable()
export class ContactService {
  constructor(@InjectRepository(Contact) private contactRepository: Repository<Contact>) {

  }
  async create(createContactDto: CreateContactDto): Promise<Contact> {
    try {
      const creating = this.contactRepository.create(createContactDto);
      return await this.contactRepository.save(creating);
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async findAll(pagination: Pagination): Promise<PaginationModel<Contact>> {
    const [entities, itemCount] = await this.contactRepository.findAndCount({
      skip: pagination.skip,
      take: pagination.take,
      order: {
        createdAt: pagination.order
      },
      where: {
        email: pagination.search ? ILike(`%${pagination.search}%`) : null,
      }
    })
    const meta = new Meta({ itemCount, pagination });
    return new PaginationModel<Contact>(entities, meta);
  }

  async findOne(id: string): Promise<Contact> {
    const contact = await this.contactRepository.findOne({
      where: {
        id
      }
    })
    if (!contact) throw new NotFoundException()
    return contact;
  }

  async update(id: string, dto: UpdateContactDto): Promise<Contact> {
    try {
      const contact = await this.findOne(id);
      return await this.contactRepository.save({
        ...dto,
        ...contact
      })
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async remove(id: string): Promise<object> {
    try {
      const contact = await this.findOne(id);
      await this.contactRepository.remove(contact);
      return {
        message: 'Contact removed successfully with id: ' + id
      }
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
