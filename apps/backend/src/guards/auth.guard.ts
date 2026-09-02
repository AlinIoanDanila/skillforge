import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  private extractToken(req: {
    headers: Record<string, string | string[] | undefined>;
    cookies?: Record<string, string | undefined>;
  }): string | undefined {
    // Primary: parsed cookie (when cookie-parser middleware is active)
    const cookieToken = req.cookies?.access_token;
    if (cookieToken) return cookieToken;

    // Fallback: raw Cookie header (e.g. during e2e tests via supertest)
    const rawCookieHeader = req.headers['cookie'];
    if (typeof rawCookieHeader !== 'string') return undefined;

    const cookies = rawCookieHeader.split(';').map((part) => part.trim());
    const accessTokenCookie = cookies.find((cookie) =>
      cookie.startsWith('access_token='),
    );

    if (!accessTokenCookie) return undefined;
    return accessTokenCookie.slice('access_token='.length);
  }

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const token = this.extractToken(req);

    if (!token) throw new UnauthorizedException({ message: 'Invalid token' });

    try {
      const tokenPayload = await this.jwtService.verifyAsync(token);

      req.user = {
        id: tokenPayload.sub,
        name: tokenPayload.username,
      };

      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
