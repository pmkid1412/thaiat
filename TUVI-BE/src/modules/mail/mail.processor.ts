import { Processor, WorkerHost, OnWorkerEvent } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import nodemailer from 'nodemailer';
import { env } from 'src/config/env.config';

@Processor('mail')
export class MailProcessor extends WorkerHost {
  private transporter = nodemailer.createTransport({
    host: env.MAIL.HOST,
    port: env.MAIL.PORT,
    secure: true,
    auth: {
      user: env.MAIL.USER,
      pass: env.MAIL.PASS,
    },
  });

  async process(job: Job<any>): Promise<any> {
    const { to, subject, body } = job.data;

    await this.transporter.sendMail({
      from: env.MAIL.FROM,
      to,
      subject,
      html: body,
    });
  }

  @OnWorkerEvent('failed')
  onFailed(job: Job, err: Error) {
    console.error(`Job ${job.id} failed:`, err.message);
  }
}
