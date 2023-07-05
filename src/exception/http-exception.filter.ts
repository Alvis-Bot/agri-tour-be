import {
	ArgumentsHost, BadRequestException,
	Catch,
	ExceptionFilter,
	HttpException, HttpStatus,
	Logger,
} from '@nestjs/common';
import {Response } from 'express';
import { ApiException } from "./api.exception";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
	private readonly logger = new Logger(HttpExceptionFilter.name);
	catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const status = exception.getStatus();

		if (exception instanceof ApiException) {
			this.logger.error(exception.getStatus());
			return response.status(exception.getStatus()).json({
				code: exception.getStatus(),
				message: exception.message,
			});
		}

		if (exception instanceof BadRequestException) {
			const exceptions: any = exception.getResponse();
			return response.status(status).json({
				code: exception.getStatus(),
				message: exceptions.message,
			});
		}

		this.logger.error(status);
		return response.status(status).json({
			code: exception.getStatus(),
			message: exception.message,
		});
	}
}
