import {
	ArgumentsHost,
	BadRequestException,
	Catch,
	ExceptionFilter,
	ForbiddenException,
	HttpException,
	HttpStatus,
} from "@nestjs/common";
import { ApiException } from "./api.exception";
import { Request, Response } from "express";
import * as fs from "fs";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
	catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const request = ctx.getRequest<Request>();
		const status =
			exception instanceof HttpException
				? exception.getStatus()
				: HttpStatus.INTERNAL_SERVER_ERROR;

		const errorLog = this.logError(exception, request);
		this.writeErrorLogToFile(errorLog);

		// custom exception error
		if (
			exception instanceof ApiException &&
			exception.constructor.name === ApiException.name
		) {
			response.status(status).json({
				// status: status,
				code: exception.code,
				message: exception.message,
			});
		} else if (status === HttpStatus.UNAUTHORIZED) {
			response.status(status).json({
				// status: status,
				code: "ACCESS_DENIED",
				message: "Access denied",
			});
		} else if (exception instanceof BadRequestException) {
			const exceptions: any = exception.getResponse();
			response.status(status).json({
				code: "BAD_REQUEST",
				message: exceptions.message,
			});
		} else if (exception instanceof ForbiddenException) {
			response.status(status).json({
				code: "FORBIDDEN_RESOURCE",
				message: "You are not allowed to access this resource",
			});
		} else {
			response.status(status).json({
				code: "INTERNAL_SERVER_ERROR",
				message: "Internal server error",
			});
		}
	}

	private logError = (exception: HttpException, request: Request) => {
		const { method, url } = request;
		const status = exception.getStatus();
		return `Response code : ${status}  - method ${method} - url : ${url}\n\n
            ${JSON.stringify(request.user ?? "Not signed in")}\n\n
            ${exception instanceof HttpException ? exception.stack : ""}`;
	};

	private writeErrorLogToFile = (errorLog: string): void => {
		console.log("active");
		fs.appendFile("error.log", errorLog, "utf8", error => {
			if (error) throw error;
		});
	};
}
