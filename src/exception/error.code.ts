import { HttpStatus } from "@nestjs/common";
import { IError } from "../common/interface";


type ErrorFactory = (status: HttpStatus, message?: string) => IError;

const errorFactory: ErrorFactory = (status: HttpStatus, message?: string) => ({
  code: message?.toUpperCase().replace(/ /g, "_"),
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
  PERSON_NOT_FOUND: errorFactory(HttpStatus.BAD_REQUEST, "Person not found"),
  PERSON_EXIST: errorFactory(HttpStatus.CONFLICT, "Person Exists"),
  LAND_EXIST: errorFactory(HttpStatus.CONFLICT, "Land existed"),
  CATEGORY_NOT_FOUND: errorFactory(HttpStatus.BAD_REQUEST, "Category not found"),
  CATEGORY_DETAIL_NOT_FOUND: errorFactory(HttpStatus.BAD_REQUEST, "Category detail not found"),
  CROP_EXISTED: errorFactory(HttpStatus.CONFLICT, "Crop existed"),
  CROP_NOT_FOUND: errorFactory(HttpStatus.NOT_FOUND, "Crop not found"),
  BAD_REQUEST: errorFactory(HttpStatus.BAD_REQUEST),
  MATERIAL_EXISTED: errorFactory(HttpStatus.CONFLICT, "Material existed"),
  MATERIAL_NOT_FOUND: errorFactory(HttpStatus.NOT_FOUND, "Material not found"),
  BILL_REQUEST_EXISTS: errorFactory(HttpStatus.CONFLICT, "Phiếu yêu cầu đã tồn tại"),
  BILL_REQUEST_NOT_FOUND: errorFactory(HttpStatus.NOT_FOUND, "Phiếu yêu cầu không tồn tại !"),
  VISITOR_EXISTS: errorFactory(HttpStatus.CONFLICT, "  VISITOR đã tồn tại"),
  VISITOR_NOT_FOUND: errorFactory(HttpStatus.CONFLICT, " VISITOR NOT FOUND"),
  AGRICULTURAL_PRODUCTS_NOT_FOUND: errorFactory(HttpStatus.NOT_FOUND, "Agricultural products not found"),
  INGREDIENT_NOT_FOUND: errorFactory(HttpStatus.NOT_FOUND, "Ingredient not found"),
  SUPPLIES_NOT_FOUND: errorFactory(HttpStatus.NOT_FOUND, "Supplies not found"),
  IMAGE_NOT_FOUND: errorFactory(HttpStatus.NOT_FOUND, "Image not found"),
  EMAIL_ALREADY_EXIST: errorFactory(HttpStatus.CONFLICT, "Email already exist"),
  FARM_ALREADY_EXIST: errorFactory(HttpStatus.CONFLICT, "Farm already exist"),
  PHONE_NUMBER_ALREADY_EXIST: errorFactory(HttpStatus.CONFLICT, "Phone number already exist"),
  INVALID_UUID: errorFactory(HttpStatus.BAD_REQUEST, "Invalid UUID"),
  CANNOT_DELETE_ADMIN: errorFactory(HttpStatus.BAD_REQUEST, "Cannot delete admin"),
  CANNOT_UPDATE_ADMIN: errorFactory(HttpStatus.BAD_REQUEST, "Cannot update admin"),


};
