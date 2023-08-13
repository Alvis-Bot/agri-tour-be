import {HttpStatus} from "@nestjs/common";
import {IError} from "./exception.interface";


type ErrorFactory = (status: HttpStatus, message: string) => IError;

const errorFactory: ErrorFactory = (status: HttpStatus, message: string) => ({
  code: message.toUpperCase().replace(/ /g, "_"),
  message,
  status
});
export const ErrorMessages = {
  REFRESH_TOKEN_INVALID: errorFactory(HttpStatus.UNAUTHORIZED, "Refresh token invalid"),
  REFRESH_TOKEN_EXPIRED: errorFactory(HttpStatus.UNAUTHORIZED, "Refresh token expired"),
  INVALID_TOKEN: errorFactory(HttpStatus.UNAUTHORIZED, "Invalid token"),
  TOKEN_EXPIRED: errorFactory(HttpStatus.UNAUTHORIZED, "Token expired"),
  USER_ALREADY_EXIST: errorFactory(HttpStatus.BAD_REQUEST, "User already exist"),
  PERMISSION_EXIST: errorFactory(HttpStatus.BAD_REQUEST, "Permission already exist"),
  GROUP_NOT_FOUND: errorFactory(HttpStatus.BAD_REQUEST, "Group not found"),
  USER_NOT_FOUND: errorFactory(HttpStatus.BAD_REQUEST, "User not found"),
  LAND_NOT_FOUND: errorFactory(HttpStatus.BAD_REQUEST, "Land not found"),
  AREA_NOT_FOUND: errorFactory(HttpStatus.BAD_REQUEST, "Area not found"),
  FARM_NOT_FOUND: errorFactory(HttpStatus.BAD_REQUEST, "Farm not found"),
  FILE_TYPE_NOT_MATCHING: errorFactory(HttpStatus.BAD_REQUEST, "File type not matching"),
  SOIL_TYPE_NOT_FOUND: errorFactory(HttpStatus.BAD_REQUEST, "Soil type not found"),
  TYPE_EXISTED: errorFactory(HttpStatus.CONFLICT, "Type existed"),
  TYPE_NOT_FOUND: errorFactory(HttpStatus.BAD_REQUEST, "Type not found"),
  PROVIDER_NOT_FOUND: errorFactory(HttpStatus.BAD_REQUEST, "Provider not found"),
  LAND_EXIST: errorFactory(HttpStatus.CONFLICT, "Land existed"),
  CATEGORY_NOT_FOUND: errorFactory(HttpStatus.BAD_REQUEST, "Category not found"),
  CATEGORY_DETAIL_NOT_FOUND: errorFactory(HttpStatus.BAD_REQUEST, "Category detail not found"),


};
