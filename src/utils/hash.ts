import * as bcryptjs from 'bcryptjs';

export class Hash {
  static generateHash(plainText: string) {
    return bcryptjs.hashSync(plainText);
  }

  static comeparePassword(plainText: string, hash: string) {
    return bcryptjs.comepareSync(plainText, hash);
  }
}
