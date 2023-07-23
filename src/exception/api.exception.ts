import { HttpException } from "@nestjs/common";
import { IError } from "./exception.interface";

export class ApiException extends HttpException {
	code: string;
	constructor(error: IError) {
		super(error.message, error.status);
		this.code = error.code;
	}
}
