import { Injectable, BadRequestException, ConflictException, NotFoundException } from '@nestjs/common';
import { CreateHarvestDto } from './dto/create-harvest.dto';
import { UpdateHarvestDto } from './dto/update-harvest.dto';
import { Harvest } from 'src/common/entities/harvest.entity';
import { PaginationModel } from 'src/common/pagination/pagination.model';
import { Pagination } from 'src/common/pagination/pagination.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LandService } from 'src/land/land.service';
import { CropsService } from 'src/crops/crops.service';
import { Meta } from 'src/common/pagination/meta.dto';
import { Response, response } from 'express';


@Injectable()
export class HarvestService {
  constructor(@InjectRepository(Harvest) private harversRepository: Repository<Harvest>,
    private readonly landService: LandService,
    private readonly cropService: CropsService
  ) {

  }
  async create(dto: CreateHarvestDto): Promise<Harvest> {
    try {
      const [land, crop] = await Promise.all([
        this.landService.getLandById(dto.landId),
        this.cropService.getCropById(dto.cropId)
      ]);
      if ((await this.existsByCropByLand(dto.landId, dto.cropId))) {
        throw new ConflictException()
      }
      const careSchedule = this.harversRepository.create({
        ...dto,
        land,
        crop
      });

      return await this.harversRepository.save(careSchedule);
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  //thiếu lọc theo ngày bắt đầu ngày kết thúc
  async findAll(pagination: Pagination): Promise<PaginationModel<Harvest>> {
    const [entities, itemCount] = await this.harversRepository
      .createQueryBuilder("harvest")
      .take(pagination.take)
      .skip(pagination.skip)
      .getManyAndCount();
    const meta = new Meta({ pagination, itemCount });
    return new PaginationModel<Harvest>(entities, meta);
  }

  async findOne(id: string): Promise<Harvest> {
    const harvest = await this.harversRepository.findOne({
      where: {
        id
      }
    })
    if (!harvest) throw new NotFoundException(`Harvest ${id} not found`);
    return harvest
  }
  async existsByCropByLand(landId: string, cropId: string): Promise<boolean> {

    return await this.harversRepository.createQueryBuilder("harvest").where("harvest.landId = :landId", { landId }).andWhere("harvest.cropId = :cropId", { cropId }).getExists();

  }
  async update(id: string, dto: UpdateHarvestDto): Promise<Harvest> {
    try {
      const harvest = await this.findOne(id);
      // if ((await this.existsByCropByLand(dto.landId, dto.cropId))) {
      //   throw new ConflictException()
      // }
      const [land, crop] = await Promise.all([
        this.landService.getLandById(dto.landId),
        this.cropService.getCropById(dto.cropId)
      ]);
      if (dto.landId) harvest.land = land;
      if (dto.cropId) harvest.crop = crop;
      return await this.harversRepository.save({
        ...harvest,
        ...dto
      })
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async remove(id: string): Promise<Response> {
    try {
      const harvest = await this.findOne(id);
      await this.harversRepository.remove(harvest);
      return response.status(200).json({
        message: 'Success removing from harvest id ' + id + ' was successful'
      })
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }
}
