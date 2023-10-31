import { Controller, Get, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ConfirmationBodyDto } from '@/DTO/confirmationBody';
import { RestorationBodyDto } from '@/DTO/restorationBody';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('sendConfirmationEmail')
  sendConfirmationEmail(@Payload() payload: ConfirmationBodyDto) {
    return this.appService.auth_mail.sendConfirmation(payload);
  }
  @MessagePattern('sendRestorationEmail')
  sendRestorationEmail(@Payload() payload: RestorationBodyDto) {
    return this.appService.auth_mail.sendRestoration(payload);
  }
}
