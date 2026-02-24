import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { MailService } from './mail.service';
import { MailProcessor } from './mail.processor';
import { env } from 'src/config/env.config';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'mail',
      connection: {
        host: env.REDIS.HOST,
        port: env.REDIS.PORT,
      },
    }),
  ],
  providers: [MailProcessor, MailService],
  exports: [MailService],
})
export class MailModule {}
