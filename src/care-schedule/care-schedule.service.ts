import { Injectable, BadRequestException, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateCareScheduleDto } from './dto/create-care-schedule.dto';
import { UpdateCareScheduleDto } from './dto/update-care-schedule.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CareSchedule } from 'src/common/entities/care-schedule.entity';
import { Repository } from 'typeorm';
import { PaginationModel } from 'src/common/pagination/pagination.model';
import { Pagination } from 'src/common/pagination/pagination.dto';
import { Meta } from 'src/common/pagination/meta.dto';
import { LandService } from 'src/land/land.service';
import { CropsService } from 'src/crops/crops.service';
import { Response, response } from 'express';

@Injectable()
export class CareScheduleService {
  constructor(
    @InjectRepository(CareSchedule) private careScheduleRepository: Repository<CareSchedule>,
    private readonly landService: LandService,
    private readonly cropService: CropsService

  ) {

  }
  async create(dto: CreateCareScheduleDto): Promise<CareSchedule | any> {
    try {
    
      const land = await this.landService.getLandById(dto.landId);
      const crop = await this.cropService.getCropById(dto.cropId);
      const careSchedule = this.careScheduleRepository.create({
        ...dto,
        land,
        crop
      });
      if ((await this.existsByName(dto.detect.name))) {
        throw new ConflictException({
          message: 'Bệnh này đã có trong lịch chăm sóc'
        })
      }
      return await this.careScheduleRepository.save(careSchedule);
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  // async getListScheduleByCropId(cropId: string): Promise<CareSchedule[]>
  // {
  //   const crop=await this.
  // }

  async findAll(pagination: Pagination): Promise<PaginationModel<CareSchedule>> {
    try {
      const [entities, itemCount] = await this.careScheduleRepository.findAndCount({
        take: pagination.take,
        skip: pagination.skip,

      })
      const meta = new Meta({ pagination, itemCount });
      return new PaginationModel<CareSchedule>(entities, meta);
    } catch (error) {
      throw new BadRequestException(error)
    }
  }
  async existsByName(name: string): Promise<boolean> {

    const careSchedule = await this.careScheduleRepository
      .createQueryBuilder("care_schedule")
      .where("care_schedule.detect->>'name' = :name", { name })//trích xuất giá trị trong jsonb
      .getExists();
    return careSchedule
  }
  async findOne(id: string): Promise<CareSchedule> {
    const careSchedule = await this.careScheduleRepository.createQueryBuilder("care_schedule").where("id = :id", { id }).getOne();
    if (!careSchedule) {
      throw new NotFoundException(`CareSchedule not found for ${id}`);
    }
    return careSchedule;
  }
  async update(id: string, dto: UpdateCareScheduleDto): Promise<CareSchedule> {
    try {
      const careSchedule = await this.findOne(id);
      const [land, crop] = await Promise.all([
        this.landService.getLandById(dto.landId),
        this.cropService.getCropById(dto.cropId),
      ]);
      // Cập nhật land nếu có giá trị từ dto, nếu không giữ nguyên giá trị hiện tại
      if (land) {
        careSchedule.land = land;
      }
      // Cập nhật crop nếu có giá trị từ dto, nếu không giữ nguyên giá trị hiện tại
      if (crop) {
        careSchedule.crop = crop;
      }
      // Lưu careSchedule đã cập nhật
      const updatedCareSchedule = await this.careScheduleRepository.save({
        ...careSchedule,
        ...dto,
      });


      return updatedCareSchedule;
    } catch (error) {
      throw new BadRequestException({
        message: error.message,
      })
    }
  }


  async remove(id: string): Promise<Response> {
    const careSchedule = await this.findOne(id);
    await this.careScheduleRepository.remove(careSchedule);
    return response.status(200).json({
      message: "Xoá lịch chăm sóc thành công !"
    });
  }
}
