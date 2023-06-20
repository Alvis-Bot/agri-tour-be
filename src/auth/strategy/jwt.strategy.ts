import { PassportStrategy } from "@nestjs/passport";
import { Inject, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { ApiException } from "../../exception/api.exception";
import { ErrorCode } from "../../exception/error.code";
import { Service } from "../../common/enum/service";
import { IAuthService } from "../auth";
import { ExtractJwt, Strategy } from "passport-jwt";
import { IJwtPayload } from "../auth.service";
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		@Inject(Service.AUTH_SERVICE) private readonly authService: IAuthService,
		private readonly configService: ConfigService,
		private readonly jwtService: JwtService,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: configService.get<string>("JWT_SECRET"),
		});
	}

	async validate(payload: IJwtPayload): Promise<any> {
		const user = await this.authService.validateJwt(payload);
		if (!user) throw new UnauthorizedException();
		return user;
	}

}
