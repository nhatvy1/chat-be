import { Request } from 'express';
import { RefreshTokenStrategy } from 'src/strategy/refresh-token.strategy';

export interface AuthRequest extends Request {
  user: Awaited<ReturnType<RefreshTokenStrategy['validate']>>;
}
