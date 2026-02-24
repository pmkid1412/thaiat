import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

import { Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';

@Injectable()
export class MailService {
  constructor(@InjectQueue('mail') private readonly mailQueue: Queue) {}

  private renderTemplate(
    templateName: string,
    context: Record<string, any>,
  ): string {
    const templatePath = path.join(
      process.cwd(),
      'src',
      'modules',
      'mail',
      'templates',
      `${templateName}.html`,
    );
    const rawTemplate = fs.readFileSync(templatePath, 'utf8');

    let rendered = rawTemplate;
    for (const [key, value] of Object.entries(context)) {
      const regex = new RegExp(`\\$\\{${key}\\}`, 'g');
      rendered = rendered.replace(regex, String(value));
    }

    return rendered;
  }

  async sendMail(
    to: string,
    subject: string,
    templateName: string,
    context: Record<string, any>,
  ) {
    try {
      const body = this.renderTemplate(templateName, context);
      await this.mailQueue.add('send-mail', { to, subject, body });
      console.log(`Queued mail to ${to}`);
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException('Email sending failed');
    }
  }

  async sendVerificationCode(to: string, code: string, name: string) {
    const subject =
      '[Thái Ất App] Chào mừng bạn! Đây là mã xác nhận của bạn 🔐';
    await this.sendMail(to, subject, 'verify-email', { code, name });
  }

  async sendResetPasswordCode(to: string, code: string, name: string) {
    const subject = '[Thái Ất App] Yêu cầu đặt lại mật khẩu của bạn 🔐';
    await this.sendMail(to, subject, 'reset-password', { code, name });
  }

  async sendPasswordNotification(to: string, password: string, name: string) {
    const subject =
      '[Thái Ất App] Tài khoản của bạn đã sẵn sàng! Đây là mật khẩu đăng nhập 🔐';
    await this.sendMail(to, subject, 'notify-password', { password, name });
  }

  async sendProUpgradeNotification(to: string, name: string) {
    const subject = '[Thái Ất App] Thông báo thay đổi trạng thái tài khoản';
    await this.sendMail(to, subject, 'notify-pro-upgrade', { name });
  }
}
