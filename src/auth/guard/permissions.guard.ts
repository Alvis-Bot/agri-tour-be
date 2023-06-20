import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Permission } from "../../common/entities/permission.entity";
import { AuthenticatedRequest } from "../../common/interface";
import { User } from "../../common/entities/user.entity";

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    @InjectRepository(Permission) private permissionRepository: Repository<Permission>,
    private readonly reflector: Reflector) {}

    canActivate(
    context: ExecutionContext,
  ) {
    const routePermissions = this.reflector.get<string[]>('permissions', context.getHandler());

    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    console.log("routePermissions" , request.user.id);

    return  this.permissionRepository.createQueryBuilder('permission')
      .leftJoin('permission.groups', 'group')
      .leftJoin('group.users', 'users')
      .where('users.id = :userId', { userId: request.user.id })
      .andWhere('permission.code IN (:...routePermissions)', { routePermissions })
      .select(['permission.code'])
      .getExists();

  }
}