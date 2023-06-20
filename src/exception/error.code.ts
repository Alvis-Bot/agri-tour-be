import { HttpStatus } from "@nestjs/common";

export const ErrorCode = {
	// system error
	INTERNAL_SERVER_ERROR: {
		message: "Internal server error",
		status: HttpStatus.INTERNAL_SERVER_ERROR,
		code: "INTERNAL_SERVER_ERROR",
	},
	BAD_REQUEST: {
		message: "bad request",
		status: HttpStatus.BAD_REQUEST,
		code: "BAD_REQUEST",
	},
	// Auth
	UNAUTHORIZED: {
		message: "Unauthorized",
		status: HttpStatus.UNAUTHORIZED,
		code: "UNAUTHORIZED",
	},
	USER_NOT_FOUND: {
		message: "User not found",
		status: HttpStatus.UNAUTHORIZED,
		code: "USER_NOT_FOUND",
	},
	USER_ALREADY_EXIST: {
		message: "user already exist",
		status: HttpStatus.CONFLICT,
		code: "USER_ALREADY_EXIST",
	},
	INVALID_PHONE: {
		message: "Invalid phone",
		status: HttpStatus.BAD_REQUEST,
		code: "BAD_REQUEST",
	},
	CANNOT_CREATE_ADMIN: {
		message: "Cannot create admin",
		status: HttpStatus.UNAUTHORIZED,
		code: "CANNOT_CREATE_ADMIN",
	},
	CANNOT_UPLOAD_FILE: {
		message: "Cannot upload file",
		status: HttpStatus.CONFLICT,
		code: "CANNOT_UPLOAD_FILE",
	},

	INVALID_OTP: {
		message: "Invalid otp",
		status: HttpStatus.BAD_REQUEST,
		code: "INVALID_OTP",
	},
	NOT_ENOUGH_MONEY: {
		message: "Not enough money",
		status: HttpStatus.CONFLICT,
		code: "NOT_ENOUGH_MONEY",
	},
	MONEY_NOT_NEGATIVE: {
		message: `money can't not be negative`,
		status: HttpStatus.BAD_REQUEST,
		code: "MONEY_NOT_NEGATIVE",
	},
	USER_NOT_CONFIRMED: {
		message: "User not confirmed",
		status: HttpStatus.UNAUTHORIZED,
		code: "USER_NOT_CONFIRMED",
	},
	PASSWORD_NOT_MATCHING: {
		message: "Password not matching",
		status: HttpStatus.BAD_REQUEST,
		code: "PASSWORD_NOT_MATCHING",
	},
	CAN_LOCK_UNLOCK_USER_ONLY: {
		message: "Can lock/unlock user only",
		status: HttpStatus.BAD_REQUEST,
		code: "CAN_LOCK_UNLOCK_USER_ONLY",
	},
	USERNAME_ALREADY_EXIST: {
		message: "Username already exist",
		status: HttpStatus.CONFLICT,
		code: "USERNAME_ALREADY_EXIST",
	},
	USER_INFO_NOT_FOUND: {
		message: "User info not found",
		status: HttpStatus.NOT_FOUND,
		code: "USER_INFO_NOT_FOUND",
	},
	MANAGER_NOT_FOUND: {
		message: "Manager not found",
		status: HttpStatus.UNAUTHORIZED,
		code: "MANAGER_NOT_FOUND",
	},
	NOT_RESULT_SESSION: {
		message: "Not result session",
		status: HttpStatus.CONFLICT,
		code: "NOT_RESULT_SESSION",
	},
	WAIT_RESULT: {
		message: "Wait result",
		status: HttpStatus.CONFLICT,
		code: "WAIT_RESULT",
	},
	NOT_FOUND_TRADING: {
		message: "Not found trading",
		status: HttpStatus.NOT_FOUND,
		code: "NOT_FOUND_TRADING",
	},
	WAIT_CHECK_RESULT: {
		message: "Wait check result",
		status: HttpStatus.CONFLICT,
		code: "WAIT_CHECK_RESULT",
	},
	USER_LOCKED: {
		message: "User locked",
		status: HttpStatus.UNAUTHORIZED,
		code: "USER_LOCKED",
	},
	TOKEN_INVALID: {
		message: "Token invalid",
		status: HttpStatus.UNAUTHORIZED,
		code: "TOKEN_INVALID",
	},
	PASSWORD_REQUEST_NOT_FOUND: {
		message: "Password request not found",
		status: HttpStatus.NOT_FOUND,
		code: "PASSWORD_REQUEST_NOT_FOUND",
	},
	CANNOT_CHANGE_TRADING: {
		message: "Cannot change trading",
		status: HttpStatus.CONFLICT,
		code: "CANNOT_CHANGE_TRADING",
	},
	TRADING_NOT_FOUND: {
		message: "Trading not found",
		status: HttpStatus.NOT_FOUND,
		code: "TRADING_NOT_FOUND",
	},
	EXPIRED_OTP: {
		message: "Expired otp",
		status: HttpStatus.BAD_REQUEST,
		code: "EXPIRED_OTP",
	},
	TIME_INVALID: {
		message: "time invalid",
		status: HttpStatus.BAD_REQUEST,
		code: "TIME_INVALID",
	},
	TIME_CONFIG_EXIST: {
		message: "Time config exist",
		status: HttpStatus.CONFLICT,
		code: "TIME_CONFIG_EXIST",
	},
	CAN_NOT_DELETE_TIME_CONFIG: {
		message: "Can not delete time config",
		status: HttpStatus.CONFLICT,
		code: "CAN_NOT_DELETE_TIME_CONFIG",
	},
	CAN_NOT_CREATE_TIME_CONFIG: {
		message: "Can not create time config",
		status: HttpStatus.CONFLICT,
		code: "CAN_NOT_CREATE_TIME_CONFIG",
	},
	FILE_TYPE_NOT_MATCHING: {
		message: "File type not matching",
		status: HttpStatus.UNSUPPORTED_MEDIA_TYPE,
		code: "FILE_TYPE_NOT_MATCHING",
	},
	TOKEN_EXPIRED: {
		message: "Token expired",
		status: HttpStatus.UNAUTHORIZED,
		code: "TOKEN_EXPIRED",
	},
	INVALID_TOKEN: {
		message: "Invalid token",
		status: HttpStatus.UNAUTHORIZED,
		code: "INVALID_TOKEN",
	},
	REFRESH_TOKEN_EXPIRED: {
		message: "Refresh token expired",
		status: HttpStatus.UNAUTHORIZED,
		code: "REFRESH_TOKEN_EXPIRED",
	},
	INVALID_REFRESH_TOKEN: {
		message: "Invalid refresh token",
		status: HttpStatus.UNAUTHORIZED,
		code: "INVALID_REFRESH_TOKEN",
	},
	ACCESS_DENIED: {
		message: "Access denied",
		status: HttpStatus.FORBIDDEN,
		code: "ACCESS_DENIED",
	},
	REFRESH_TOKEN_INVALID: {
		message: "Refresh token invalid",
		status: HttpStatus.UNAUTHORIZED,
		code: "REFRESH_TOKEN_INVALID",
	},
	TIME_NOT_EQUAL: {
		message: "Time not equal",
		status: HttpStatus.BAD_REQUEST,
		code: "TIME_NOT_EQUAL",
	},
	START_TIME_GREATER_THAN_END_TIME: {
		message: "Start time greater than end time",
		status: HttpStatus.BAD_REQUEST,
		code: "START_TIME_GREATER_THAN_END_TIME",
	},
	REFERRAL_CODE_NOT_FOUND: {
		message: "Referral code not found",
		status: HttpStatus.NOT_FOUND,
		code: "REFERRAL_CODE_NOT_FOUND",
	},
	NO_SALE_AVAILABLE: {
		message : 'no sale available',
		status : HttpStatus.CONFLICT,
		code : 'NO_SALE_AVAILABLE'

	},
	SALE_NOT_FOUND: {
		message : 'sale not found',
		status : HttpStatus.NOT_FOUND,
		code : 'SALE_NOT_FOUND'
	},
	SALE_IS_LOCKED: {
		message : 'sale is locked',
		status : HttpStatus.UNAUTHORIZED,
		code : 'SALE_IS_LOCKED'
	}

};
