import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService, IJwtPayload } from '../auth.service';
import { User } from '../../common/entities/user.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		private readonly authService: AuthService,
		private configService: ConfigService,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey:configService.get<string>("JWT_SECRET"),
		});
	}

	async validate(payload: IJwtPayload): Promise<User> {
		return await this.authService.validateJwt(payload);
	}

}
