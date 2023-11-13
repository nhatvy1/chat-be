import { IsEmail, IsEmpty, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  readonly fullName: string;
  
  @IsEmpty()
  readonly avatar: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;


  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  password: string;

  @IsNotEmpty()
  readonly phone: string

  @IsEmpty()
  readonly status: string
}
