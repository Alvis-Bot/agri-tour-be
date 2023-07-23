import { HttpStatus } from "@nestjs/common";
import { IError } from "./exception.interface";



interface IErrorCode {
  REFRESH_TOKEN_INVALID: IError;
  REFRESH_TOKEN_EXPIRED: IError;
  INVALID_TOKEN: IError;
  TOKEN_EXPIRED: IError;
  USER_ALREADY_EXIST: IError;
  PERMISSION_EXIST: IError;
  GROUP_NOT_FOUND: IError;
  USER_NOT_FOUND: IError;
  LAND_NOT_FOUND: IError;
  AREA_NOT_FOUND: IError;
  FARM_NOT_FOUND: IError;
  FILE_TYPE_NOT_MATCHING: IError;
  SOIL_TYPE_NOT_FOUND: IError;


}
export const ErrorCode:IErrorCode = {
	// system error
  USER_ALREADY_EXIST: {
    status: HttpStatus.BAD_REQUEST,
    message: "user already exist",
    code: "USER_ALREADY_EXIST",

  },
  PERMISSION_EXIST: {
    status: HttpStatus.BAD_REQUEST,
    message: "permission already exist",
    code: "PERMISSION_EXIST",
  },
  GROUP_NOT_FOUND: {
    status: HttpStatus.BAD_REQUEST,
    message: "group not found",
    code: "GROUP_NOT_FOUND",
  },
  USER_NOT_FOUND: {
    status: HttpStatus.BAD_REQUEST,
    message: "user not found",
    code: "USER_NOT_FOUND",
  },
  LAND_NOT_FOUND: {
    status: HttpStatus.BAD_REQUEST,
    message: "land not found",
    code: "LAND_NOT_FOUND",
  },
  AREA_NOT_FOUND: {
    status: HttpStatus.BAD_REQUEST,
    message: "area not found",
    code: "AREA_NOT_FOUND",
  },
  FARM_NOT_FOUND: {
    status: HttpStatus.BAD_REQUEST,
    message: "farm not found",
    code: "FARM_NOT_FOUND",
  },
  FILE_TYPE_NOT_MATCHING: {
    status: HttpStatus.BAD_REQUEST,
    message: "file type not matching",
    code: "FILE_TYPE_NOT_MATCHING",
  },
  SOIL_TYPE_NOT_FOUND: {
    status: HttpStatus.BAD_REQUEST,
    message: "soil type not found",
    code: "SOIL_TYPE_NOT_FOUND",
  },
  TOKEN_EXPIRED: {
    status: HttpStatus.UNAUTHORIZED,
    message: "token expired",
    code : 'TOKEN_EXPIRED'
  },
  INVALID_TOKEN: {
    status: HttpStatus.UNAUTHORIZED,
    message: "invalid token",
    code : 'INVALID_TOKEN'
  },
  REFRESH_TOKEN_EXPIRED: {
    status: HttpStatus.UNAUTHORIZED,
    message: "refresh token expired",
    code : 'REFRESH_TOKEN_EXPIRED'
  },
  REFRESH_TOKEN_INVALID: {
    status: HttpStatus.UNAUTHORIZED,
    message: "refresh token invalid",
    code : 'REFRESH_TOKEN_INVALID'
  }


};
