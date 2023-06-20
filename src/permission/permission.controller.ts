import { Body, Controller, Get, Inject, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { Service } from "../common/enum/service";
import { PermissionService } from "./permission.service";
import { ApiTags } from "@nestjs/swagger";
import { UpdatePermissionDto } from "../common/dto/update-permission.dto";
import { Router } from "../common/enum/router";
import { CreatePermissionDto } from "../common/dto/create-permission..dto";
import { JwtAuthGuard } from "../auth/guard/jwt-auth.guard";
import { Permissions } from "../common/decorator/permissions.decorator";
import { Description } from "../common/decorator/description.decorator";



@Controller(Router.PERMISSION)
@ApiTags("Permission APIs  (permission)")
export class PermissionController {


  constructor( private readonly permissionService : PermissionService) {}

    // @Post()
    // @Description("Tạo quyền")
    // async createPermission(@Body() dto: CreatePermissionDto) {
    //   return this.permissionService.createPermission(dto);
    // }

    // @Get()
    // @Description("Lấy danh sách quyền")
    // async getPermissions() {
    //     return  this.permissionService.getPermissions();
    // }

  }
