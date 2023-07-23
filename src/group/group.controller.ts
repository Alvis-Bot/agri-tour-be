import { Body, Controller, Delete, Get, Patch, Post, Query, Req } from "@nestjs/common";
import { Router } from "../common/enum/router";
import { CreateGroupDto } from "../common/dto/create-group.dto";
import { Note } from "../common/decorator/description.decorator";
import { GroupService } from "./group.service";
import { ApiTags } from "@nestjs/swagger";
import { UpdateGroupDto } from "../common/dto/update-group.dto";
import { Group } from "src/common/entities/group.entity";
import { User } from "src/common/entities/user.entity";

@Controller(Router.GROUP)
@ApiTags("Group APIs (group)")
export class GroupController {

  constructor(private readonly groupService: GroupService) { }


  // @Post()
  // @Description("Tạo nhóm quyền cho người dùng")
  // async createGroup(@Body() dto: CreateGroupDto){
  //   return await this.groupService.createGroup(dto);
  // }

  // @Get()
  // @Description("Lấy danh sách nhóm quyền")
  // async getGroups(){
  //   return await this.groupService.getGroups();
  // }

  // @Patch()
  // @Description("Xoá nhóm quyền")
  // async deleteGroup(@Query("groupId") groupId: string){
  //   return await this.groupService.deleteGroup(groupId);
  // }

  // @Patch("/add-permissions")
  // @Description("Cập nhật nhóm quyền này dành cho backend (dev)")
  // async addPermissions(@Body() dto: UpdateGroupDto){
  //   return await this.groupService.addPermissions(dto);
  // }
  
  @Post('add-user-group')
  async addUserGroup(@Query('userId') userId: string, @Query('groupId') groupId: string): Promise<Group> {
    return await this.groupService.addUserGroup(userId, groupId);
  }
  @Post('create')
  async createGroup(@Body() groupData: CreateGroupDto): Promise<Group> {
    return await this.groupService.createGroup(groupData);
  }

  @Get('get')
  async getGroup(@Query('id') groupId: string): Promise<Group> {
    return await this.groupService.getGroup(groupId);
  }

  @Get('gets')
  async getAllGroups(): Promise<Group[]> {
    return await this.groupService.getAllGroups();
  }
  @Get('get-users-group')
  @Note("Get all users in groups (admin only)")
  async getUsersInGroup(@Query('groupId') groupdid: string): Promise<User[]> {
    return await this.groupService.getUsersInGroup(groupdid);
  }

  @Patch('update')
  async updateGroup(@Query('id') groupId: string, @Body() groupData: UpdateGroupDto): Promise<Group> {
    return await this.groupService.updateGroup(groupId, groupData);
  }

  @Delete('delete')
  async deleteGroup(@Query('id') groupId: string): Promise<Object> {
    return await this.groupService.deleteGroup(groupId);
  }


}
