import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from 'src/common/dto/create-role.dto';
import { UpdateRoleDto } from 'src/common/dto/update-role.dto';
import { ApiTags } from '@nestjs/swagger';
import { Role } from 'src/common/entities/role.entity';


@Controller('role')
@ApiTags("ROLES API")
export class RoleController {
  constructor(private readonly roleService: RoleService) { }

  @Post('create-role')
  async createRole(@Body() roleData: CreateRoleDto): Promise<Role> {
    return this.roleService.createRole(roleData);
  }

  @Get('get')
  async getRole(@Query('id') roleId: string): Promise<Role> {
    return this.roleService.getRole(roleId);
  }

  @Get('gets')
  getAllRoles(): Promise<Role[]> {
    return this.roleService.getAllRoles();
  }

  @Patch('update-role')
  async updateRole(@Query('id') roleId: string, @Body() roleData: UpdateRoleDto): Promise<Role> {
    return this.roleService.updateRole(roleId, roleData);
  }

  @Delete('delete')
  async deleteRole(@Query('id') roleId: string): Promise<Object> {
    return await this.roleService.deleteRole(roleId);
  }
}
