import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../UserModule/user.service';
import { SignUpDto } from './dto/sign-up.dto';
import { JwtPayload } from './interfaces/jwt-payload';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

	generateToken(userId: number) {
		const payload: JwtPayload = { userId }
		return this.jwtService.sign(payload)
	}
	async signUp(signUpDto: SignUpDto) {
		const user = await this.userService.createUser(signUpDto)
		const token = this.generateToken(user.id)
		return { user, token}
	}
}
