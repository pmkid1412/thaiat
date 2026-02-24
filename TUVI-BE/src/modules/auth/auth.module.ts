import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../../common/strategies/jwt.strategy';
import { env } from 'src/config/env.config';
import { SocialAuthModule } from '../user_auth_provider/social-auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  AuthSession,
  FcmToken,
  Language,
  SocialAuth,
  ToolUsage,
  User,
} from 'src/database/entities/index.entity';
import { MailModule } from '../mail/mail.module';
import { FirebaseModule } from '../firebase/firebase.module';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: env.APP.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    SocialAuthModule,
    TypeOrmModule.forFeature([
      User,
      SocialAuth,
      Language,
      AuthSession,
      ToolUsage,
      FcmToken,
    ]),
    MailModule,
    FirebaseModule,
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
