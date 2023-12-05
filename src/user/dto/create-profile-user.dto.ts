import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";
import { User } from "src/common/entities/user.entity";
import { UserCreateDto } from "./user-create.dto";
import { Role } from "src/common/enum";
import { RoleDTO } from "src/common/enum/role.enum";


export class CreateUserDTO extends UserCreateDto {
}