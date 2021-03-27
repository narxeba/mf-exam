import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SignupRequestDto } from './dto/signup-request.dto';
import { compareHash } from '../../common/encryption';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(userId: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(userId);
    if (user && compareHash(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async signUp(body: SignupRequestDto) {
    const user = await this.usersService.findOne(body.user_id);
    if (user) {
      throw new HttpException(
        {
          message: 'Account creation failed',
          cause: 'this user_id is already taken',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const result = await this.usersService.create(body);
    return {
      message: 'Account successfully created',
      user: {
        user_id: result.userId,
        nickname: result.nickname,
      },
    };
  }
}
