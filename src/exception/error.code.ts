import { HttpStatus } from "@nestjs/common";

export const ErrorCode = {
	// system error
  USER_ALREADY_EXIST: {
    message: "User already exist",
    code: HttpStatus.BAD_REQUEST
  },
  PERMISSION_EXIST: {
    message: 'Permission already exist',
    code: HttpStatus.BAD_REQUEST
  },
  GROUP_NOT_FOUND: {
      message: "Group not found",
    code: HttpStatus.BAD_REQUEST
  },
  USER_NOT_FOUND: {
      message: "User not found",
    code: HttpStatus.BAD_REQUEST
  },
  LAND_NOT_FOUND: {
      code: HttpStatus.BAD_REQUEST,
      message: "Land not found",
  },
  AREA_NOT_FOUND: {
      code: HttpStatus.BAD_REQUEST,
      message: "Area not found",
  },
  FARM_NOT_FOUND: {
      code: HttpStatus.BAD_REQUEST,
      message: "Farm not found",
  },
  FILE_TYPE_NOT_MATCHING: {
      code: HttpStatus.BAD_REQUEST,
      message: "File type not matching",
  },
  SOIL_TYPE_NOT_FOUND: {
      code: HttpStatus.BAD_REQUEST,
      message: "Soil type not found",
  }


};
