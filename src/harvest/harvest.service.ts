import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateHarvestDto } from './dto/create-harvest.dto';
import { UpdateHarvestDto } from './dto/update-harvest.dto';
import { Harvest } from 'src/common/entities/harvest.entity';
import { PaginationModel } from 'src/common/pagination/pagination.model';
import { Pagination } from 'src/common/pagination/pagination.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LandService } from 'src/land/land.service';
import { CropsService } from 'src/crops/crops.service';

@Injectable()
export class HarvestService {
  constructor(@InjectRepository(Harvest) private harversRepository: Repository<Harvest>,
    private readonly landService: LandService,
    private readonly cropService: CropsService
  ) {

  }
  async create(dto: CreateHarvestDto): Promise<Harvest|any> {
    try {
      
      const land = await this.landService.getLandById(dto.landId);
      const crop = await this.cropService.getCropById(dto.cropId);
      
      // const careSchedule = this.harversRepository.create({
      //   ...dto,
      //   land,
      //   crop
      // });
      // if ((await this.existsByName(dto.detect.name))) {
      //   throw new ConflictException({
      //     message: 'Bệnh này đã có trong lịch chăm sóc'
      //   })
      // }
     // return await this.harversRepository.save(careSchedule);
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async findAll(pagination: Pagination): Promise<PaginationModel<Harvest>> {
    return;
  }

  async findOne(id: string): Promise<Harvest> {
    return;
  }

  async update(id: string, updateHarvestDto: UpdateHarvestDto): Promise<Harvest> {
    return;
  }

  async remove(id: string): Promise<Harvest> {
    return;
  }
}
