import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { env } from 'src/config/env.config';
import { User } from 'src/database/entities/user.entity';
import { IsNull, Not, Repository } from 'typeorm';
import { UserRole } from '../constants/user.constant';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: env.APP.JWT_SECRET,
      ignoreExpiration: false,
    });
  }

  async validate(payload: any) {
    const user = await this.userRepository.findOne({
      where: [
        {
          id: payload.sub,
          userRole: UserRole.USER,
          emailVerifiedAt: Not(IsNull()),
          isActive: true,
        },
        { id: payload.sub, userRole: UserRole.ADMIN, isActive: true },
      ],
      relations: ['language'],
    });

    if (!user) {
      throw new UnauthorizedException('Unauthorized');
    }

    return {
      id: user.id,
      email: user.email,
      role: user.userRole,
      language: user.language,
      type: user.userType,
    };
  }
}
