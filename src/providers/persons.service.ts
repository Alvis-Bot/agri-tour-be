import { Injectable } from '@nestjs/common';
import { CreatePersonDto } from '../common/dto/create-person.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PersonEntity } from '../common/entities/person.entity';
import { UpdatePersonDto } from 'src/common/dto/update-person.dto';
import { Pagination } from 'src/common/pagination/pagination.dto';
import { ApiException } from "../exception/api.exception";
import { ErrorMessages } from "../exception/error.code";
import { Meta } from "../common/pagination/meta.dto";
import { PaginationModel } from "../common/pagination/pagination.model";
import { Type } from 'src/common/entities/type.entity';

@Injectable()
export class PersonsService {
  constructor(
    @InjectRepository(PersonEntity)
    private readonly personsRepository: Repository<PersonEntity>,
    @InjectRepository(Type)
    private readonly typeRepository: Repository<Type>,
  ) { }

  async findTypeByName(name: string): Promise<Type> {
    const type = await this.typeRepository.findOne({
      where: { name },
      select: ['id', 'name']
    });
    if (!type) throw new ApiException(ErrorMessages.TYPE_NOT_FOUND);
    return type;
  }
  async createPerson(dto: CreatePersonDto, typeName: string): Promise<PersonEntity | any> {
    const type = await this.findTypeByName(typeName);
    const person = await this.personsRepository.exist({
      where: {
        name: dto.name
      }
    })
    if (person) throw new ApiException(ErrorMessages.PERSON_EXIST);

    const creating = this.personsRepository.create({
      ...dto,
      type
    });
    return await this.personsRepository.save(creating);
  }

  async getPaginationPersons(pagination: Pagination): Promise<PaginationModel<PersonEntity>> {
    const queryBuilder = this.personsRepository
      .createQueryBuilder("person_entity")
      .orderBy("person_entity.createdAt", pagination.order)
      .take(pagination.take)
      .skip(pagination.skip)

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const meta = new Meta({ itemCount, pagination });

    return new PaginationModel<PersonEntity>(entities, meta);

  }

  async getPersonById(id: string): Promise<PersonEntity> {
    const provider = await this.personsRepository.findOneBy({ id });
    if (!provider) throw new ApiException(ErrorMessages.PERSON_NOT_FOUND)
    return provider;
  }

  async getPersonsByType(typeName: string, pagination: Pagination): Promise<PaginationModel<PersonEntity>> {
    const type = await this.findTypeByName(typeName);

    const [entities, itemCount] = await this.personsRepository.findAndCount({
      where: {
        type
      },
      take: pagination.take,
      skip: pagination.skip,
      order: {
        createdAt: pagination.order
      }
    });

    const meta = new Meta({ itemCount, pagination });

    return new PaginationModel<PersonEntity>(entities, meta);
  }

  async updatePerson(id: string, dto: UpdatePersonDto): Promise<PersonEntity> {
    const person = await this.getPersonById(id);
    const updating = this.personsRepository.merge(person, dto);
    return await this.personsRepository.save(updating);
  }

  async removePerson(id: string): Promise<object> {
    const person = await this.getPersonById(id);
    await this.personsRepository.remove(person);
    return {
      message: `Removed person with id = ${id}  successfully`
    }
  }
}
