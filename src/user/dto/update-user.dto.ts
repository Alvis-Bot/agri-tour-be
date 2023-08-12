import { ApiProperty } from "@nestjs/swagger";
import { Farm } from "../../common/entities/farm.entity";
import { Group } from "../../common/entities/group.entity";

export class UpdateUserDto {

    @ApiProperty()
    fullName: string;

    @ApiProperty()
    username: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    isLocked: boolean;
   
    @ApiProperty()
    refreshToken:string
}