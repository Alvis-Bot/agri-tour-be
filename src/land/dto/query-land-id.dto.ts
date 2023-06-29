import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class QueryLandIdDto{

  @ApiProperty()
  @IsNotEmpty()
  landId: string;
}