import { ApiProperty } from "@nestjs/swagger";


export class UserCreateDto {

  @ApiProperty()
  fullName: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;

}