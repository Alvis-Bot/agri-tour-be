import { Injectable } from '@nestjs/common';
import { CreateProviderDto } from '../common/dto/create-provider.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Provider } from '../common/entities/provider.entity';
import { UpdateProviderDto } from 'src/common/dto/update-provider.dto';

@Injectable()
export class ProvidersService {
  constructor(
    @InjectRepository(Provider)
    private readonly providerRepository: Repository<Provider>,
  ) { }

  create(createProviderDto: CreateProviderDto) {
    return 'This action adds a new provider';
  }

  findAll() {
    return `This action returns all providers`;
  }

  findOne(id: string) {
    return `This action returns a #${id} provider`;
  }

  update(id: string, updateProviderDto: UpdateProviderDto) {
    return `This action updates a #${id} provider`;
  }

  remove(id: string) {
    return `This action removes a #${id} provider`;
  }
}
