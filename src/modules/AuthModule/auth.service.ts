import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CatService } from '../CatModule/cat.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private catService: CatService, private jwtService: JwtService) {}

  async signIn(username: string, pass: string): Promise<any> {
    const cat = await this.catService.findOne(username);
    if (cat?.password !== pass) {
      throw new UnauthorizedException();
    }

    const payload = { sub: cat.catId, username: cat.name };

    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
