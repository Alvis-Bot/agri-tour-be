import { HttpException } from '@nestjs/common';

export class ApiException extends HttpException {
	constructor(error) {
		super(error.message, error.status);
	}
}
