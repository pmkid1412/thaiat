import * as crypto from 'crypto';
import { env } from 'src/config/env.config';

export class TokenUtil {
  static hash = (token: string): string => {
    return crypto
      .createHmac('sha256', env.APP.TOKEN_HASH_SECRET)
      .update(token)
      .digest('hex');
  };

  static compare = (token: string, storedHash: string): boolean => {
    const incomingHash = this.hash(token);

    if (
      !crypto.timingSafeEqual(
        Buffer.from(incomingHash, 'hex'),
        Buffer.from(storedHash, 'hex'),
      )
    ) {
      return false;
    }

    return true;
  };
}
