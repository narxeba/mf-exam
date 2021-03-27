import {
  Body,
  Controller,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupRequestDto } from './dto/signup-request.dto';
import { SignupPipe } from './pipes/signup.pipe';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticatedRequest } from '../common/auth-request.interface';
import { UsersService } from '../users/users.service';

@Controller()
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('signup')
  @HttpCode(200)
  public async signup(
    @Body(new SignupPipe()) body: SignupRequestDto,
  ): Promise<any> {
    return await this.authService.signUp(body);
  }

  @Post('close')
  @HttpCode(200)
  @UseGuards(AuthGuard('basic'))
  public async close(@Request() request: AuthenticatedRequest) {
    return await this.usersService.delete(request.user);
  }
}
