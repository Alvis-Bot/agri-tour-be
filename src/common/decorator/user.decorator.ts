import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import {AuthenticatedRequest} from "../../../dist/common/interface";


export const AuthUser = createParamDecorator(
	(data: string, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest<AuthenticatedRequest>();
		return data ? request.user?.[data] : request.user;
	},
);
