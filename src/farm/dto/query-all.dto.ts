import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsUUID } from "class-validator";

export class QueryAllDto {


  @IsUUID()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Id của trang trại',
    default: null
  })
  farmId: string;

  @IsUUID()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Id của khu vực',
  })
  areaId : string

  @IsUUID()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Id của vùng đất',
  })
  landId : string


}