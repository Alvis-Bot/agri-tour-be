import { ApiPropertyOptional } from '@nestjs/swagger';
import {IsEmail, IsOptional, IsString} from 'class-validator';
import { Role } from '../../common/enum';
import { OmitType } from '@nestjs/swagger';

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
export class UserUpdateProfileByManagerDto extends OmitType(UserUpdateDto, [ 'avatar' ] as const) {
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
  @IsEmail()
  @ApiPropertyOptional()
  email: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  phoneNumber: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    enum: Role,
    default: Role.USER,
  })
  role: Role;

  @IsOptional()
  @ApiPropertyOptional()
  isLocked: boolean;
}
