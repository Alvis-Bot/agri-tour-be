import { Injectable } from '@nestjs/common';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { Material } from 'src/common/entities/material.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryDetailsService } from 'src/category-details/category-details.service';
import { StorageService } from 'src/storage/storage.service';
import { ImagePath } from 'src/common/enum';
import { ApiTags } from '@nestjs/swagger';
import { PaginationModel } from 'src/common/pagination/pagination.model';
import { Pagination } from 'src/common/pagination/pagination.dto';
import { Meta } from 'src/common/pagination/meta.dto';
import { ApiException } from 'src/exception/api.exception';
import { ErrorMessages } from 'src/exception/error.code';
@ApiTags('API Vật tư')
@Injectable()
export class MaterialService {
  constructor(
    @InjectRepository(Material)
    private readonly materialRepository: Repository<Material>,
    private readonly categoryDetailsService: CategoryDetailsService,
    private readonly storageService: StorageService
  ) { }
  async create(dto: CreateMaterialDto, images: Express.Multer.File[]): Promise<Material | any> {
    // kiểm tra xem tên cây trồng đã tồn tại chưa
    await this.existsByName(dto.name)

    const materialGroup = await this.categoryDetailsService.getDetailCategoryById(dto.materialGroupId)

    // upload ảnh
    const imageCrop = await this.storageService.uploadMultiFiles(ImagePath.CARD_MATERIAL, images)

    const crop = this.materialRepository.create({
      ...dto,
      materialGroup,
      images: imageCrop
    });
    return await this.materialRepository.save(crop);
  }
  async existsByName(name: string): Promise<boolean> {
    const check = await this.materialRepository.exist({
      where: { name }
    });
    return check;
  }

  async findAll(pagination: Pagination): Promise<PaginationModel<Material>> {

    const [entities, itemCount] = await this.materialRepository.findAndCount({
      take: pagination.take,
      skip: pagination.skip,
      order: {
        createdAt: pagination.order
      }
    });

    const meta = new Meta({ itemCount, pagination });

    return new PaginationModel<Material>(entities, meta);
  }

  async findOne(id: string): Promise<Material> {
    const material = await this.materialRepository.findOne({
      where: { id },
      loadEagerRelations: true
    })
    if (!material) throw new ApiException(ErrorMessages.MATERIAL_NOT_FOUND);
    return material;
  }

  async update(id: string, updateMaterialDto: UpdateMaterialDto): Promise<Material> {
    const material = await this.findOne(id);
    const checkByName = await this.existsByName(updateMaterialDto.name);

    if (checkByName) throw new ApiException(ErrorMessages.MATERIAL_EXISTED);
    const materialGroup = await this.categoryDetailsService.getDetailCategoryById(updateMaterialDto.materialGroupId);

    // else {
    //   if (!updateMaterialDto.materialGroupId) {
    //     materialGroup =
    //   }
    //   else {
    //     materialGroup = material.materialGroup;
    //   }
    // }
    // upload ảnh
    const images = await this.storageService.uploadMultiFiles(ImagePath.CARD_MATERIAL, updateMaterialDto.images)
    const merged = this.materialRepository.merge(material, {
      ...updateMaterialDto,
      materialGroup,
      images
    })
    const updated = await this.materialRepository.update(id, merged);
    if (!updated) throw new ApiException(ErrorMessages.BAD_REQUEST);
    return merged;
  }

  async remove(id: string): Promise<Object> {
    const material = await this.findOne(id);
    await this.materialRepository.remove(material);
    return {
      message: 'Remove material with id ' + id + ' successfully',
    }
  }
}
