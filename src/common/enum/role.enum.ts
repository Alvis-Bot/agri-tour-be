import { ApiPropertyOptional } from "@nestjs/swagger";
import { Role } from "./auth";

export class RoleDTO {
    @ApiPropertyOptional({
        enum: Role,
        default: Role.USER
    })
    role: Role = Role.USER;
}