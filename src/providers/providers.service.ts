import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProviderDto } from '../common/dto/create-provider.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Provider } from '../common/entities/provider.entity';
import { UpdateProviderDto } from 'src/common/dto/update-provider.dto';
import { Pagination } from 'src/common/pagination/pagination.dto';

@Injectable()
export class ProvidersService {
  constructor(
    @InjectRepository(Provider)
    private readonly providerRepository: Repository<Provider>,
  ) { }

  async create(createProviderDto: CreateProviderDto): Promise<Provider> {
    const creating = this.providerRepository.create(createProviderDto);
    return await this.providerRepository.save(creating);
  }

  async findAll(pagination: Pagination): Promise<Provider[]> {
    return await this.providerRepository.find({
      skip: pagination.skip,
      take: pagination.take,
      order: {
        createdAt: pagination.order
      }
    });
  }

  async findOne(id: string): Promise<Provider> {
    const provider = await this.providerRepository.findOne({
      where: { id }
    });
    if (!provider) throw new NotFoundException({
      message: ['Provider not found']
    })
    return provider;
  }

  async update(id: string, updateProviderDto: UpdateProviderDto): Promise<Provider> {
    const provider = await this.findOne(id);
    const merged = this.providerRepository.merge(provider, updateProviderDto);
    const updated = await this.providerRepository.update(id, merged);
    if (!updated) {
      throw new BadRequestException({
        message: ['Provider update failed']
      })
    }
    return merged;

  }

  async remove(id: string): Promise<Object> {
    const provider = await this.findOne(id);
    const remove = await this.providerRepository.remove(provider);
    if (!remove) throw new BadRequestException({
      message: ['Delete provider failed']
    })
    return {
      message: ['Delete provider successfully removed']
    }
  }
}
