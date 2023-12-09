import { ApiProperty, PickType } from "@nestjs/swagger";
import { Land } from "../../common/entities/land.entity";
import { IsNotEmpty, IsUUID } from "class-validator";

// đổi id thành landId
export class QueryLandId {

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  landId: string;
}