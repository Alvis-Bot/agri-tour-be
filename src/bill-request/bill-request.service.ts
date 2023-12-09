import { Injectable } from '@nestjs/common';
import { CreateBillRequestDto } from './dto/create-bill-request.dto';
import { UpdateBillRequestDto } from './dto/update-bill-request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BillRequest } from 'src/common/entities/bill-request.entity';
import { Repository } from 'typeorm';
import { PersonsService } from 'src/providers/persons.service';
import { MaterialService } from 'src/material/material.service';
import { ApiException } from 'src/exception/api.exception';
import { ErrorMessages } from 'src/exception/error.code';
import { PaginationModel } from 'src/common/pagination/pagination.model';
import { Pagination } from 'src/common/pagination/pagination.dto';
import { Meta } from 'src/common/pagination/meta.dto';

@Injectable()
export class BillRequestService {

  constructor(
    @InjectRepository(BillRequest)
    private readonly billRequestRepository: Repository<BillRequest>,
    private readonly personService: PersonsService,
    private readonly materialService: MaterialService
  ) { }
  async create(createBillRequestDto: CreateBillRequestDto): Promise<BillRequest | any> {
    try {
      const checked = await this.checkExist(createBillRequestDto.name);
      if (checked) throw new ApiException(ErrorMessages.BILL_REQUEST_EXISTS);
      const provider = await this.personService.getPersonById(createBillRequestDto.providerId);

      const material = await this.materialService.findOne(createBillRequestDto.materialId);
      // Here you can map the data from the DTO to the Entity and save it
      const billRequest = this.billRequestRepository.create({
        ...createBillRequestDto,
        provider,
        material
      });

      return await this.billRequestRepository.save(billRequest);
    } catch (error) {
      throw new ApiException(ErrorMessages.BAD_REQUEST, error.message);
    }

  }
  async update(id: string, dto: UpdateBillRequestDto): Promise<BillRequest | any> {
    try {
      const billRequest = await this.findOne(id);
      const checked = await this.checkExist(dto.name);
      if (checked) throw new ApiException(ErrorMessages.BILL_REQUEST_EXISTS);
      const provider = await this.personService.getPersonById(dto.providerId);

      const material = await this.materialService.findOne(dto.materialId);
      const merged = this.billRequestRepository.merge(billRequest, {
        ...dto,
        provider,
        material
      })
      await this.billRequestRepository.update(billRequest.id, merged);
      return merged;
    } catch (error) {
      throw new ApiException(ErrorMessages.BAD_REQUEST, error.message);
    }
    // const provider = await this.personService.getPersonById(dto.providerId);
  }
  async checkExist(name: string): Promise<boolean> {
    return await this.billRequestRepository.exist({
      where: { name }
    });
  }
  async findAll(pagination: Pagination): Promise<PaginationModel<BillRequest>> {
    const [entities, itemCount] = await this.billRequestRepository.findAndCount({
      skip: pagination.skip,
      take: pagination.take,
      order: {
        createdAt: pagination.order
      },
      loadEagerRelations: true
    })
    const meta = new Meta({ itemCount, pagination });
    return new PaginationModel<BillRequest>(entities, meta);
  }

  async findOne(id: string): Promise<BillRequest> {
    const billRequest = await this.billRequestRepository.findOne({
      where: { id },
      loadEagerRelations: true
    })
    if (!billRequest) throw new ApiException(ErrorMessages.BILL_REQUEST_NOT_FOUND);
    return billRequest;
  }


  async remove(id: string): Promise<Object> {
    try {
      const billRequest = await this.findOne(id);
      await this.billRequestRepository.remove(billRequest);
      return {
        message: `Bill request with id ${id} removed successfully `
      }
    } catch (error) {
      throw new ApiException(ErrorMessages.BAD_REQUEST, error.message);
    }

  }
}
