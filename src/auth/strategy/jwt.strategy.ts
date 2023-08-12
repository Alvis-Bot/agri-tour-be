import { PassportStrategy } from "@nestjs/passport";
import { Inject, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Service } from "../../common/enum/service";
import { IAuthService } from "../auth";
import { ExtractJwt, Strategy } from "passport-jwt";
import { IJwtPayload } from "../auth.service";
import { User } from "../../common/entities/user.entity";
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		@Inject(Service.AUTH_SERVICE) private readonly authService: IAuthService,
		private readonly configService: ConfigService,
		
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: configService.get<string>("JWT_SECRET"),
		});
	}

	async validate(payload: IJwtPayload): Promise<User> {
		const user = await this.authService.validateJwt(payload);
		if (!user) throw new UnauthorizedException();
		return user;
	}

}
