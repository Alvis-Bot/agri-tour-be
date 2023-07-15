// import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
// import { IsNotEmpty, IsOptional, IsString } from "class-validator";

// export class CreateGroupDto{
//   @ApiProperty()
//   @IsNotEmpty()
//   @IsString()
//   name: string;

//   @IsOptional()
//   @IsString()
//   @ApiPropertyOptional()
//   description : string;
// }
import { ApiProperty } from '@nestjs/swagger';

export class CreateGroupDto {
  @ApiProperty({
    example: 'Admin Group',
  })
  name: string;
  @ApiProperty({
    example: 'The name of the group',
  })
  description : string;
}
