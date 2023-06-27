import { IsNotEmpty, IsUUID } from "class-validator";


export class QueryIdDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;
}