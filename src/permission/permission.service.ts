import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Permission } from "../common/entities/permission.entity";
import { CreatePermissionDto } from "../common/dto/create-permission..dto";


@Injectable()
export class PermissionService{

  constructor(@InjectRepository(Permission) private permissionRepository: Repository<Permission>) {}


  async createPermission(dto: CreatePermissionDto) {
    const createdPermission = this.permissionRepository.create(dto);
    return this.permissionRepository.save(createdPermission);
  }

  async createPermissions(ids: string[]) {
    const permissions = await this.permissionRepository.create({});
    return permissions;
  }

  async getPermissions() {
    return this.permissionRepository.find();
  }
}
