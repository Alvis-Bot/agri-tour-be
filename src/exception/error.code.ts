import { HttpStatus } from "@nestjs/common";

export const ErrorCode = {
	// system error
  USER_ALREADY_EXIST: {
    message: 'USER_ALREADY_EXIST',
    code: HttpStatus.BAD_REQUEST
  },
  PERMISSION_EXIST: {
    message: 'PERMISSION_EXIST',
    code: HttpStatus.BAD_REQUEST
  },
  GROUP_NOT_FOUND: {
      message: "GROUP_NOT_FOUND",
    code: HttpStatus.BAD_REQUEST
  },
  USER_NOT_FOUND: {
    message: "USER_NOT_FOUND",
    code: HttpStatus.BAD_REQUEST
  },
  LAND_NOT_FOUND: {
      code: HttpStatus.BAD_REQUEST,
      message: "LAND_NOT_FOUND",
  },
  AREA_NOT_FOUND: {
      code: HttpStatus.BAD_REQUEST,
      message: 'AREA_NOT_FOUND',
  },
  FARM_NOT_FOUND: {
      code: HttpStatus.BAD_REQUEST,
      message: "FARM_NOT_FOUND",
  },
  FILE_TYPE_NOT_MATCHING: {
      code: HttpStatus.BAD_REQUEST,
      message: "FILE_TYPE_NOT_MATCHING",
  },
  SOIL_TYPE_NOT_FOUND: {
      code: HttpStatus.BAD_REQUEST,
      message: "SOIL_TYPE_NOT_FOUND",
  }


};
