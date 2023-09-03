import { Injectable } from '@nestjs/common';
import { CreateVisitorDto } from './dto/create-visitor.dto';
import { UpdateVisitorDto } from './dto/update-visitor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Visitor } from 'src/common/entities/visitor.entity';
import { Repository } from 'typeorm';
import { PaginationModel } from 'src/common/pagination/pagination.model';
import { Pagination } from 'src/common/pagination/pagination.dto';
import { Meta } from 'src/common/pagination/meta.dto';
import { ApiException } from 'src/exception/api.exception';
import { ErrorMessages } from 'src/exception/error.code';

@Injectable()
export class VisitorService {
  constructor(@InjectRepository(Visitor)
  private readonly visitorRepository: Repository<Visitor>
  ) {

  }
  async create(createVisitorDto: CreateVisitorDto): Promise<Visitor> {
    try {
      const check = await this.checkExist(createVisitorDto.name);
      if (check) throw new ApiException(ErrorMessages.VISITOR_EXISTS);
      const creating = this.visitorRepository.create(createVisitorDto);
      const saving = await this.visitorRepository.save(creating);
      return saving;
    } catch (error) {
      throw new ApiException(ErrorMessages.BAD_REQUEST, error.message);
    }
  }

  async checkExist(name: string): Promise<boolean> {
    return await this.visitorRepository.exist({
      where: { name }
    })
  }
  async findAll(pagination: Pagination): Promise<PaginationModel<Visitor>> {
    const [entities, itemCount] = await this.visitorRepository.findAndCount({
      skip: pagination.skip,
      take: pagination.take,
      order: {
        createdAt: pagination.order
      },

    })
    const meta = new Meta({ itemCount, pagination });
    return new PaginationModel<Visitor>(entities, meta);
  }

  async findOne(id: string): Promise<Visitor> {
    const visitor = await this.visitorRepository.findOne({
      where: { id }
    })
    if (!visitor) throw new ApiException(ErrorMessages.VISITOR_NOT_FOUND)
    return visitor;
  }

  async update(id: string, updateVisitorDto: UpdateVisitorDto): Promise<Visitor> {
    const visitor = await this.findOne(id);
    const checkExist = await this.checkExist(updateVisitorDto.name);
    if (checkExist) throw new ApiException(ErrorMessages.VISITOR_EXISTS);
    const merged = this.visitorRepository.merge(visitor, updateVisitorDto);
     await this.visitorRepository.update(visitor.id, merged);
    return merged;
  }

  async remove(id: string): Promise<object> {
    try {
      const visitor = await this.findOne(id);
      await this.visitorRepository.remove(visitor);
      return {
        status: 200,
        message: `Delete Visitor With Id ${id} Successfully`
      }
    } catch (error) {
      throw new ApiException(ErrorMessages.BAD_REQUEST, error.message);
    }
  }
}
