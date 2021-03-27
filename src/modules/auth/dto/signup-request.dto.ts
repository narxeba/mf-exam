import {
  IsAlphanumeric,
  IsHalfWidth,
  IsNotEmpty,
  Length,
  Matches,
} from 'class-validator';
export class SignupRequestDto {
  @IsNotEmpty()
  @IsHalfWidth()
  @IsAlphanumeric()
  @Length(6, 20)
  user_id: string;

  @IsNotEmpty()
  @Matches('^([\x21-\x7e]{8,20})$')
  password: string;
}
