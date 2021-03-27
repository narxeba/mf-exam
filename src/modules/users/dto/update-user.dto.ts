import { MaxLength } from 'class-validator';

export class UpdateUserDto {
  user_id: string;
  password: string;
  @MaxLength(29)
  nickname: string;

  @MaxLength(99)
  comment: string;
}
