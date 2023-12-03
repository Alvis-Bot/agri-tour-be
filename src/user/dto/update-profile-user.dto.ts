import { OmitType, PartialType } from "@nestjs/swagger";
import { CreateUserDTO } from "./create-profile-user.dto";

export class UpdateUserDTO extends PartialType(OmitType(CreateUserDTO, ["username", "password", "role"])) {

}