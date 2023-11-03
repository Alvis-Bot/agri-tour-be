import { ApiProperty } from "@nestjs/swagger";

import { Role } from "src/common/enum";

export class UserUpdateDto {

    @ApiProperty()
    fullName: string;

    @ApiProperty()
    password: string;

    @ApiProperty({
        default: false
    })
    isLocked: boolean;

    role?: Role;

}