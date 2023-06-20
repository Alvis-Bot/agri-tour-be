import { HttpException } from "@nestjs/common";
import { IError } from "./exception.interface";

export class ApiException extends HttpException {
	code: number;

	constructor(error: IError) {
		super(error.message, error.code);
		this.code = error.code;
	}
}
