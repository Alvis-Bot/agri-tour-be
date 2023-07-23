import { Body, Controller, Inject, Patch, Post, Query } from "@nestjs/common";
import { Router } from "../common/enum/router";
import { ManagerService } from "./manager.service";
import { UserService } from "../user/service/user.service";
import { Note } from "../common/decorator/description.decorator";

@Controller(Router.MANAGER)
export class ManagerController {

  constructor(private readonly managerService: ManagerService) {}

  // @Patch('/add-group-for-user')
  // @Description("Cập nhật nhóm quyền cho người dùng")
  // async addGroupForUser(@Query('userId') userId: string, @Query('groupId') groupId: string) {
  //   return await this.managerService.addGroupForUser(userId, groupId);
  // }




}
