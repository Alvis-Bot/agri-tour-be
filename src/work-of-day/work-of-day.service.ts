import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateWorkOfDayDto } from 'src/common/dto/create-work-of-day.dto';
import { UpdateWorkOfDayDto } from 'src/common/dto/update-work-of-day.dto';
import { WorkOfDay } from 'src/common/entities/work-of-day.entity';
import { CropsService } from 'src/crops/crops.service';
import { LandService } from 'src/land/land.service';
import { Repository } from 'typeorm';
import { QueryWorkOfDayDTO } from './dto/create-query-dto';
import { Pagination } from 'src/common/pagination/pagination.dto';
import { Meta } from 'src/common/pagination/meta.dto';
import { PaginationModel } from 'src/common/pagination/pagination.model';
import { ApiException } from 'src/exception/api.exception';
import { ErrorMessages } from 'src/exception/error.code';
import { UpdateQueryWorkOfDayDTO } from './dto/update-query-dto';
type ValidRelations = "land" | "crop";
@Injectable()
export class WorkOfDayService {
  constructor(
    @InjectRepository(WorkOfDay)
    private readonly workOfDayRepository: Repository<WorkOfDay>,
    private readonly landService: LandService,
    private readonly cropService: CropsService
  ) { }
  async create(createWorkOfDayDto: CreateWorkOfDayDto, queryDTO: QueryWorkOfDayDTO): Promise<WorkOfDay> {
    const land = await this.landService.getLandById(queryDTO.landId);
    const crop = await this.cropService.getCropById(queryDTO.cropId);
    const creating = this.workOfDayRepository.create({
      ...createWorkOfDayDto,
      land,
      crop
    });
    const saved = await this.workOfDayRepository.save(creating);
    return saved;
  }

  async findAll(pagination: Pagination): Promise<PaginationModel<WorkOfDay>> {
    const [entities, itemCount] = await this.workOfDayRepository.findAndCount({
      skip: pagination.skip,
      take: pagination.take,
      order: {
        createdAt: pagination.order
      },

    })
    const meta = new Meta({ itemCount, pagination });

    return new PaginationModel<WorkOfDay>(entities, meta);
  }

  async findOneById(id: string): Promise<WorkOfDay> {
    const workOfDay = await this.workOfDayRepository.findOne({
      where: {
        id
      },

    })
    if (!workOfDay) throw new ApiException(ErrorMessages.CROP_NOT_FOUND)
    return workOfDay;
  }

  async update(queryDTO: UpdateQueryWorkOfDayDTO, updateWorkOfDayDto: UpdateWorkOfDayDto): Promise<WorkOfDay | any> {
    const workOfDay = await this.findOneById(queryDTO.id);

    let merged = workOfDay;

    if (queryDTO.landId) {
      const land = await this.landService.getLandById(queryDTO.landId);
      merged = this.workOfDayRepository.merge(merged, { land });
    }

    if (queryDTO.cropId) {
      const crop = await this.cropService.getCropById(queryDTO.cropId);
      merged = this.workOfDayRepository.merge(merged, { crop });
    }

    merged = this.workOfDayRepository.merge(merged, updateWorkOfDayDto);

    const updated = await this.workOfDayRepository.update(queryDTO.id, merged);

    if (!updated && merged) {
      throw new ApiException(ErrorMessages.BAD_REQUEST, 'Cập nhật thất bại!');
    }

    return merged;
  }


  async remove(id: string): Promise<Object> {
    const workOfDay = await this.findOneById(id);
    await this.workOfDayRepository.remove(workOfDay);
    return {
      message: 'Deleted work of the day successfully !'
    }
  }
}
