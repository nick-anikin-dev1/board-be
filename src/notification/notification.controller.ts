import { Controller, Post } from '@nestjs/common';
import { NotificationService } from './notification.service';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('send-welcome-email')
  async sendWelcomeEmail() {
    const to = 'recipient@example.com';
    const subject = 'Welcome to our service!';
    const template = './welcome';
    const context = { name: 'John Doe' };

    await this.notificationService.sendEmail(to, subject, template, context);
    return { message: 'Email sent successfully!' };
  }
}