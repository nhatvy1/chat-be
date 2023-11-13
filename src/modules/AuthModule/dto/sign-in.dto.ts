import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class SignInDto {
    @IsNotEmpty()
    @IsEmail()
    readonly email: string

    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(100)
    password: string
}