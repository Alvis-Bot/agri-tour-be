import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsOptional } from "class-validator";

export enum EUserRelated {
    ALL = "ALL",
    farms = "farms",
    harvests = "harvests",
    farmingCalenders = "farmingCalenders"
}
export type TRelationUser = "farms" | "harvests" | "farmingCalenders";
export type TSearchUserDTO =
    'fullName' |
    'jobTitle' |
    'description' |
    'avatar' |
    'email' |
    'role' |
    'homeTown' |
    'address' |
    'username'
    ;
export class UserRelation {

    @ApiPropertyOptional({
        enum: EUserRelated,
        //  default: EUserRelated.ALL
        required: false
    })
    //@IsEnum(EUserRelated)
    relation?: EUserRelated;
}