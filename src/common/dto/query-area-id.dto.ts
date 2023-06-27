import { IsNotEmpty, IsUUID } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class QueryAreaIdDto{

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  areaId: string;
}