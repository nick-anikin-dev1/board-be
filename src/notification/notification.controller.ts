import { Controller, Post, Body } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateEmailDto } from './dto/create-notification.dto';

@Controller('emails')
export class NotificationController {
  constructor(private notificationService: NotificationService) {}

  @Post()
  async sendEmail(@Body() dto: CreateEmailDto): Promise<string> {
    return this.notificationService.sendEmail(dto);
  }
}
