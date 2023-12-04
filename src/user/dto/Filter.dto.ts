import { ApiPropertyOptional, OmitType, PartialType } from "@nestjs/swagger";
import { CreateUserDTO } from "./create-profile-user.dto";
import { IsEnum, IsOptional } from "class-validator";

export enum ESearchUserDTO {
    fullName = 'fullName',
    jobTitle = 'jobTitle',
    description = 'description',
    avatar = 'avatar',
    email = 'email',
    role = 'role',
    homeTown = 'homeTown',
    address = 'address',
    username = 'username',
}

export class UserSearchDTO {
    @ApiPropertyOptional({
        enum: ESearchUserDTO,
        description: 'Please select column and enter value from search'
    })

    @IsOptional()
    column?: ESearchUserDTO;
}