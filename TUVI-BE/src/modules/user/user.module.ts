import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from '../../database/entities/user.entity';
import { SocialAuth } from 'src/database/entities/social-auth.entity';
import { MailModule } from '../mail/mail.module';
import { ToolUsage } from 'src/database/entities/tool-usage.entity';
import { FirebaseModule } from '../firebase/firebase.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, SocialAuth, ToolUsage]),
    MailModule,
    FirebaseModule,
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
