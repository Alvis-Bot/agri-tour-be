import { PartialType } from "@nestjs/swagger";
import { FarmCreateDto } from "./farm-create.dto";

export class UpdateFarmDTO extends PartialType(FarmCreateDto) {

}