import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

export class PasswordUtil {
  static async hash(password: string): Promise<string> {
    const hashRounds = 10;

    return await bcrypt.hash(password, hashRounds);
  }

  static async compare(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }

  static generatePassword(length = 12): string {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
    const bytes = crypto.randomBytes(length);
    const passwordChars: string[] = [];

    for (let i = 0; i < length; i++) {
      passwordChars.push(chars[bytes[i] % chars.length]);
    }

    return passwordChars.join('');
  }
}
