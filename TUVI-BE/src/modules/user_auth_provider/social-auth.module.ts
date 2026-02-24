import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocialAuth } from 'src/database/entities/social-auth.entity';
import { SocialAuthService } from './social-auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([SocialAuth])],
  providers: [SocialAuthService],
  exports: [SocialAuthService],
})
export class SocialAuthModule {}
