import { BadRequestException, CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new BadRequestException("Missing token");
        }

        try {
            const decodedToken = await this.jwtService.verify(token);
            if (!decodedToken) {
                throw new BadRequestException("Invalid token");
            }
            request.uid = decodedToken.uid;
            request.user = decodedToken;
            return true;
        } catch (error) {
            return false;
        }
    }
    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
