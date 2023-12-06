import {
  ApiPropertyOptional,
  IntersectionType,
  OmitType, PickType,
} from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { UserCreateDto } from './user-create.dto';
import {Role} from "../../common/enum";

export class UserUpdateDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  fullName: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  jobTitle: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  phoneNumber: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  description: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  address: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  homeTown: string;

  @IsOptional()
  @ApiPropertyOptional({
    type: 'string',
    format: 'binary',
  })
  avatar: Express.Multer.File;
}

// kế thừ UserUpdateDto và thêm các trường cần thiết
export class UserUpdateProfileByManagerDto extends UserUpdateDto {
    @IsOptional()
    @IsString()
    @ApiPropertyOptional()
    password: string;

    @IsOptional()
    @IsString()
    @ApiPropertyOptional()
    username: string;

    @IsOptional()
    @IsString()
    @ApiPropertyOptional()
    email: string;

    @IsOptional()
    @IsString()
    @ApiPropertyOptional()
    phoneNumber: string;

    @IsOptional()
    @IsString()
    @ApiPropertyOptional()
    role: Role;


    @IsOptional()
    @IsString()
    @ApiPropertyOptional()
    isLocked: boolean;
}
