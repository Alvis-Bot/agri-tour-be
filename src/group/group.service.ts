import { Inject, Injectable } from "@nestjs/common";
import { CreateGroupDto } from "../common/dto/create-group.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Group } from "../common/entities/group.entity";
import { PermissionService } from "../permission/permission.service";
import { UpdateGroupDto } from "../common/dto/update-group.dto";
import { ApiException } from "../exception/api.exception";
import { ErrorCode } from "../exception/error.code";
import { FeatureService } from "../feature/service/feature.service";
import { Service } from "../common/enum/service";
import { IFeatureService } from "../feature/service/feature";
import { Permission } from "../common/entities/permission.entity";

@Injectable()
export class GroupService {

  constructor(@InjectRepository(Group) private groupRepository: Repository<Group> ,
              @InjectRepository(Permission) private permissionRepository: Repository<Permission>,
              private readonly permissionService : PermissionService ,
              @Inject(Service.FEATURE_SERVICE) private readonly  featureService : IFeatureService) {}


  async createGroup(dto: CreateGroupDto) : Promise<Group>{
    const permissions = await this.permissionService.getPermissions();
    const createdGroup = await this.groupRepository.create({
      ...dto,
      permissions
    });
    return  await this.groupRepository.save(createdGroup);
  }

  async getGroups() {
    return this.groupRepository
      .createQueryBuilder("group")
      .where("group.isDeleted = :isDeleted", { isDeleted: false })
      // .leftJoinAndSelect("group.permissions", "permission")
      .getMany();
  }

  async deleteGroup(groupId: string) {
    return this.groupRepository
      .createQueryBuilder("group")
      .update(Group)
      .set({ isDeleted: true })
      .where("id = :groupId", { groupId })
      .execute();
  }

  async getGroupById(id: string) {
    return this.groupRepository
      .createQueryBuilder("group")
      .where('group.id = :id', {id})
      .getOne();
  }

  async addPermissions(dto: UpdateGroupDto) {
    const group = await this.getGroupById(dto.id);
    if (!group) throw new ApiException(ErrorCode.GROUP_NOT_FOUND)
    const feature =await this.featureService.selectCodesFeature();
    console.log(feature)
    const permissions : Permission[] = []
    for (const code of feature) {
      const permission = await this.permissionRepository.create({
        code: code,
        isLocked: false,
      });
      permissions.push(permission);
    }
    console.log(permissions)
    group.permissions = permissions;
    await this.permissionRepository.save(permissions);
    return await this.groupRepository.save(group);
  }
}
