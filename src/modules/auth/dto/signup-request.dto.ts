import {
  IsAlphanumeric,
  IsHalfWidth,
  IsNotEmpty,
  Length,
  Matches,
} from 'class-validator';
export class SignupRequestDto {
  @IsNotEmpty({ message: 'required user_id and password' })
  @IsHalfWidth({ message: 'required user_id and password' })
  @IsAlphanumeric()
  @Length(6, 20, { message: 'required user_id and password' })
  user_id: string;

  @IsNotEmpty()
  @Matches('^([\x21-\x7e]{8,20})$')
  password: string;
}
