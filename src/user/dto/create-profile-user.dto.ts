import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";
import { User } from "src/common/entities/user.entity";
import { UserCreateDto } from "./user-create.dto";
import { Role } from "src/common/enum";
import { RoleDTO } from "src/common/enum/role.enum";


export class CreateUserDTO extends UserCreateDto {

    @ApiProperty({
        required: true
    })
    fullName: string;

    @ApiProperty({
        required: false
    })
    email: string;

    @ApiProperty({
        required: false
    })
    jobTitle: string;

    @ApiProperty({
        required: false
    })
    phoneNumber: string;

    @ApiProperty({
        required: false
    })
    description: string;

    @ApiProperty({
        type: "string",
        format: 'binary',
        required: false
    })
    avatar: Express.Multer.File;

    @ApiProperty({
        enum: Role,
        default: Role.USER,
        required: false
    })
    role: Role

    @ApiProperty({
        example: false
    })
    isLocked: boolean;
}