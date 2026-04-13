import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CurrentUserGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const auth = req.headers['authorization'];

    if (!auth) throw new UnauthorizedException({ message: 'Invalid token' });

    const [type, token] = auth.split(' ');

    if (!type || type !== 'Bearer')
      throw new UnauthorizedException({ message: 'Invalid token' });

    try {
      const tokenPayload = await this.jwtService.verifyAsync(token);

      req.user = {
        userId: tokenPayload.sub,
        username: tokenPayload.username,
      };

      return true;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
