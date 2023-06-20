import { applyDecorators, SetMetadata, UseGuards } from "@nestjs/common";
import { PermissionsGuard } from "../../auth/guard/permissions.guard";

export const Permissions = (...permissions: string[]) =>
  applyDecorators(SetMetadata('permissions', permissions) , UseGuards(PermissionsGuard)) ;