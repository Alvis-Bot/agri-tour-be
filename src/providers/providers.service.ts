import {Injectable} from '@nestjs/common';
import {CreateProviderDto} from '../common/dto/create-provider.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Provider} from '../common/entities/provider.entity';
import {UpdateProviderDto} from 'src/common/dto/update-provider.dto';
import {Pagination} from 'src/common/pagination/pagination.dto';
import {ApiException} from "../exception/api.exception";
import {ErrorMessages} from "../exception/error.code";
import {Meta} from "../common/pagination/meta.dto";
import {PaginationModel} from "../common/pagination/pagination.model";

@Injectable()
export class ProvidersService {
  constructor(
    @InjectRepository(Provider)
    private readonly providerRepository: Repository<Provider>,
  ) { }

  async createProvider(dto: CreateProviderDto): Promise<Provider> {
    const creating = this.providerRepository.create(dto);
    return await this.providerRepository.save(creating);
  }

  async getPaginationProviders(pagination: Pagination): Promise<PaginationModel<Provider>> {
    const queryBuilder = this.providerRepository
        .createQueryBuilder("provider")
        .orderBy("provider.createdAt", pagination.order)
        .take(pagination.take)
        .skip(pagination.skip)

    const itemCount = await queryBuilder.getCount();
    const {entities} = await queryBuilder.getRawAndEntities();

    const meta = new Meta({itemCount, pagination});

    return new PaginationModel<Provider>(entities, meta);

  }

  async getProviderById(id: string): Promise<Provider> {
    const provider = await this.providerRepository.findOneBy({id});
    if (!provider) throw new ApiException(ErrorMessages.PROVIDER_NOT_FOUND)
    return provider;
  }

  async updateProvider(id: string, dto: UpdateProviderDto): Promise<Provider> {
    const provider = await this.getProviderById(id);
    const updating = this.providerRepository.merge(provider, dto);
    return await this.providerRepository.save(updating);
  }

  async removeProvider(id: string): Promise<void> {
    const provider = await this.getProviderById(id);
    await this.providerRepository.delete(provider);
  }
}
