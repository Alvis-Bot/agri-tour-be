import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoleDto } from 'src/common/dto/create-role.dto';
import { UpdateRoleDto } from 'src/common/dto/update-role.dto';
import { Role } from 'src/common/entities/role.entity';
import { Repository } from 'typeorm';


@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) { }

  async createRole(roleData: CreateRoleDto): Promise<Role> {
    const roleNameExists = await this.getRoleByName(roleData.name);
    if (roleNameExists) {
      throw new ConflictException("Role name already exists");
    }
    const newRole = this.roleRepository.create(roleData);
    return await this.roleRepository.save(newRole);
  }

  async getRole(roleId: string): Promise<Role> {
    const role = this.roleRepository.findOne({
      where: {
        id: roleId,
        isLocked: false
      }
    });
    if (!role) {
      throw new BadRequestException('Role not found')
    }
    return role;
  }

  async getRoleByName(name: string): Promise<Role> {
    const role = this.roleRepository.findOne({
      where: {
        name,
        isLocked: false
      }
    });
    if (!role) {
      throw new BadRequestException('Role not found')
    }
    return role;
  }
  async getAllRoles(): Promise<Role[]> {
    return this.roleRepository.find({
      where: {
        isLocked: false
      }
    });
  }

  async updateRole(roleId: string, roleData: UpdateRoleDto): Promise<Role> {
    const role = await this.getRole(roleId);
    const merged = await this.roleRepository.merge(role, roleData);
    const roleNameExists = await this.getRoleByName(merged.name);
    if (roleNameExists) {
      throw new ConflictException("Role name already exists");
    }
    const updated = await this.roleRepository.update(roleId, merged);
    if (!updated) {
      throw new BadRequestException('Update role failed');
    }
    return await this.getRole(roleId);
  }

  async deleteRole(roleId: string): Promise<Object> {
    await this.getRole(roleId);
    await this.roleRepository.delete(roleId);
    return {
      message: 'Deleting role ' + roleId + ' successfully'
    }
  }
}
