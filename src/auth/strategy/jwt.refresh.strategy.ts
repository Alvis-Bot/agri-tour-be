import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Inject, Injectable } from "@nestjs/common";
import { UserService } from "../../user/user.service";
import { ConfigService } from "@nestjs/config";
import { Request } from "express";
import { ApiException } from "../../exception/api.exception";
import { JwtService } from "@nestjs/jwt";
import { Service } from "../../common/enum/service";
import { IAuthService } from "../auth";
import { IJwtPayload } from "../auth.service";
import {ErrorMessages} from "../../exception/error.code";

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
	Strategy,
	"refresh",
) {
	constructor(
		private readonly userService: UserService,
		private readonly configService: ConfigService,
		@Inject(Service.AUTH_SERVICE) private readonly authService: IAuthService,
		private readonly jwtService: JwtService,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: true,
			secretOrKey: configService.get<string>("JWT_SECRET"),
			passReqToCallback: true,
		});
	}

	async validate(request: Request, payload: IJwtPayload): Promise<IJwtPayload> {
		console.log("JwtRefreshStrategy.validate", payload);
		try {
			await this.jwtService.verify(
				request.headers["authorization"].split(" ")[1],
				{
					ignoreExpiration: true,
				},
			);
		} catch (e) {
			switch (e.name) {
				case "TokenExpiredError":
					throw new ApiException(ErrorMessages.TOKEN_EXPIRED);
				case "JsonWebTokenError":
					throw new ApiException(ErrorMessages.INVALID_TOKEN);
				default:
					throw new ApiException(ErrorMessages.INVALID_TOKEN);
			}
		}
		await this.authService.validateUserRefreshToken(payload.id, request.body.refreshToken);
		return await this.authService.validateJwt(payload);
	}
}
