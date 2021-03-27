import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../models/user.entity';
import { Repository } from 'typeorm';
import { SignupRequestDto } from '../auth/dto/signup-request.dto';
import { generateSecureHash } from '../../common/encryption';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repository: Repository<User>) {}

  public async findOne(userId: string) {
    return await this.repository.findOne({ where: { userId: userId } });
  }

  public async detail(userId: string) {
    const user = await this.findOne(userId);
    if (!user) {
      throw new HttpException(
        {
          message: 'No user found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    let detail;
    if (user.comment) {
      detail = {
        user_id: user.userId,
        nickname: user.nickname,
        comment: user.comment,
      };
    } else {
      detail = { user_id: user.userId, nickname: user.nickname };
    }
    return {
      message: 'User details by user_id',
      user: detail,
    };
  }

  public async create(body: SignupRequestDto) {
    const hashedPassword = generateSecureHash(body.password);
    return await this.repository.save({
      userId: body.user_id,
      nickname: body.user_id,
      password: hashedPassword,
    });
  }

  public async update(loggedInUser: User, userId: string, body: UpdateUserDto) {
    let user = await this.findOne(userId);
    // if (!user) {
    //   throw new HttpException(
    //     {
    //       message: 'No user found',
    //     },
    //     HttpStatus.NOT_FOUND,
    //   );
    // }
    if (!body.nickname && !body.comment) {
      throw new HttpException(
        {
          message: 'User updation failed',
          cause: 'Require nickname or comment',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (body.user_id || body.password) {
      throw new HttpException(
        {
          message: 'User updation failed',
          cause: 'user_id and password not updatable',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (loggedInUser.userId != userId) {
      throw new HttpException(
        {
          message: 'No Permission for Update',
        },
        HttpStatus.FORBIDDEN,
      );
    }
    if (body.nickname) {
      user.nickname = body.nickname;
    }
    user.comment = body.comment;
    user = await this.repository.save(user);
    return {
      message: 'User successfully updated',
      recipe: [
        {
          nickname: user.nickname,
          comment: user.comment,
        },
      ],
    };
  }

  public async delete(loggedInUser: User) {
    await this.repository.remove(loggedInUser);
    return {
      message: 'Account and user successfully removed',
    };
  }
}
