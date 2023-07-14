import { ApiProperty } from "@nestjs/swagger";
import { Farm } from "../entities/farm.entity";
import { Group } from "../entities/group.entity";

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