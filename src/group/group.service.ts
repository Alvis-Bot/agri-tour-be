import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
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
import { User } from "src/common/entities/user.entity";
import { UserService } from "src/user/service/user.service";

@Injectable()
export class GroupService {

  constructor(
    @InjectRepository(Group) private groupRepository: Repository<Group>,
    @InjectRepository(Permission) private permissionRepository: Repository<Permission>,
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly permissionService: PermissionService,
    private readonly userService: UserService,
    @Inject(Service.FEATURE_SERVICE) private readonly featureService: IFeatureService) { }

  async createGroup(groupData: Partial<Group>): Promise<Group> {
    const newGroup = this.groupRepository.create(groupData);
    return this.groupRepository.save(newGroup);
  }

  async getGroup(groupId: string): Promise<Group> {
    const group = await this.groupRepository.findOne({
      where: {
        id: groupId,
      }
    });
    if (!group) {
      throw new NotFoundException("Group not found");
    }
    return group;
  }

  async getAllGroups(): Promise<Group[]> {
    return this.groupRepository.find();
  }

  async updateGroup(groupId: string, groupData: Partial<Group>): Promise<Group> {
    const group = await this.getGroup(groupId);
    const merged = await this.groupRepository.merge(group, groupData);

    const updated = await this.groupRepository.update(groupId, merged);
    if (!updated) {
      throw new BadRequestException("Group update failed");
    }
    return merged
  }

  async deleteGroup(groupId: string): Promise<Object> {
    const group = await this.getGroup(groupId);
    if (group) {
      await this.groupRepository.delete(groupId);
    }
    return {
      message: 'Group deleted successfully'
    }
  }
  async addUserGroup(userId: string, groupId: string): Promise<Group> {
    const group = await this.groupRepository.findOne({
      where: {
        id: groupId
      },
      relations: ['users']
    });
    const user = await this.userService.getUserById(userId);

    if (!group || !user) {
      throw new NotFoundException("group or user is not found")
      // Throw an error or handle the case where group or user is not found
    }

    group.users.push(user);

    return this.groupRepository.save(group);
  }
  async getUsersInGroup(groupId: string): Promise<User[]> {
    const group = await this.groupRepository.findOne({
      where: {
        id: groupId
      },
      relations: ['users']
    });

    if (!group) {
      // Throw an error or handle the case where group is not found
      throw new NotFoundException("Group not found")
    }

    return group.users;
  }
  // async createGroup(dto: CreateGroupDto) : Promise<Group>{
  //   const permissions = await this.permissionService.getPermissions();
  //   const createdGroup = await this.groupRepository.create({
  //     ...dto,
  //     permissions
  //   });
  //   return  await this.groupRepository.save(createdGroup);
  // }

  // async getGroups() {
  //   return this.groupRepository
  //     .createQueryBuilder("group")
  //     .where("group.isDeleted = :isDeleted", { isDeleted: false })
  //     // .leftJoinAndSelect("group.permissions", "permission")
  //     .getMany();
  // }

  // async deleteGroup(groupId: string) {
  //   return this.groupRepository
  //     .createQueryBuilder("group")
  //     .update(Group)
  //     .set({ isDeleted: true })
  //     .where("id = :groupId", { groupId })
  //     .execute();
  // }

  // async getGroupById(id: string) {
  //   return this.groupRepository
  //     .createQueryBuilder("group")
  //     .where('group.id = :id', {id})
  //     .getOne();
  // }

  // async addPermissions(dto: UpdateGroupDto) {
  //   const group = await this.getGroupById(dto.id);
  //   if (!group) throw new ApiException(ErrorCode.GROUP_NOT_FOUND)
  //   const feature =await this.featureService.selectCodesFeature();
  //   console.log(feature)
  //   const permissions : Permission[] = []
  //   for (const code of feature) {
  //     const permission = await this.permissionRepository.create({
  //       code: code,
  //       isLocked: false,
  //     });
  //     permissions.push(permission);
  //   }
  //   console.log(permissions)
  //   group.permissions = permissions;
  //   await this.permissionRepository.save(permissions);
  //   return await this.groupRepository.save(group);
  // }
}
