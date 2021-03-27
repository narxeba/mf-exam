import { BasicStrategy as Strategy } from 'passport-http';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Injectable()
export class BasicStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(userId: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(userId, password);
    if (!user) {
      throw new UnauthorizedException({
        message: 'Authentication failed',
      });
    }
    return user;
  }
}
