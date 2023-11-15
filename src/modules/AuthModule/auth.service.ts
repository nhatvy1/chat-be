import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../UserModule/user.service';
import { SignUpDto } from './dto/sign-up.dto';
import { JwtPayload } from './interfaces/jwt-payload';
import { SignInDto } from './dto/sign-in.dto';
import { Hash } from 'src/utils/hash';
import { TokenVerify, Tokens } from './interfaces/token.interface';
import { accessToken, refreshToken } from 'src/utils/constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async generateToken(userId: number, fullName: string): Promise<Tokens> {
    const payload: JwtPayload = { userId, fullName };
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: accessToken.secret,
        expiresIn: accessToken.expiresIn,
      }),
      this.jwtService.signAsync(payload, {
        secret: refreshToken.secret,
        expiresIn: refreshToken.expiresIn,
      }),
    ]);

    return { access_token: access_token, refresh_token: refresh_token };
  }

  async refreshToken(tokenVerify: TokenVerify) {
    const { access_token, refresh_token } = await this.generateToken(
      tokenVerify.userId,
      tokenVerify.fullName,
    );
    return { access_token, refresh_token };
  }

  async signUp(signUpDto: SignUpDto) {
    const user = await this.userService.createUser(signUpDto);
    const token = this.generateToken(user.id, user.fullName);
    return { user, token };
  }

  async signIn(signInDto: SignInDto) {
    const user = await this.userService.getUserByEmail(signInDto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const isValidPassword = Hash.compare(signInDto.password, user.password);
    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid password');
    }

    const { access_token, refresh_token }: Tokens = await this.generateToken(
      user.id,
      user.fullName,
    );
    delete user.password;
    return { user, access_token, refresh_token };
  }
}
