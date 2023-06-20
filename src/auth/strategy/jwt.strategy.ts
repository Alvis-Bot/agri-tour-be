import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Inject } from "@nestjs/common";
import { Service } from "../../common/enum/services.enum";
import { IAuth } from "../../common/interface/auth.interface";
import { AuthService } from "../service/auth.service";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { ApiException } from "../../exception/api.exception";
import { ErrorCode } from "../../exception/error.code";

export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		@Inject(Service.AUTH) private readonly authService: AuthService,
		private readonly configService: ConfigService,
		private readonly jwtService: JwtService,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: true,
			passReqToCallback: true,
			secretOrKey: configService.get<string>("JWT_ACCESS_TOKEN_SECRET"),
		});
	}

	async validate(request: Request): Promise<IAuth> {
		try {
			
			const payload = await this.jwtService.verifyAsync(
				request.headers["authorization"].split(" ")[1],
			);
			await this.authService.validateJwt(payload.id);
			return payload;
		} catch (e) {
			switch (e.name) {
				case "TokenExpiredError":
					throw new ApiException(ErrorCode.TOKEN_EXPIRED);
				case "JsonWebTokenError":
					throw new ApiException(ErrorCode.INVALID_TOKEN);
				default:
					throw new ApiException(ErrorCode.INVALID_TOKEN);
			}
		}
	}
}
