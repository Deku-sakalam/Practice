import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @Get('api/status')
  getStatus() {
    return this.appService.getStatus();
  }

  @Post('api/message')
  sendMessage(@Body() body: { message?: string }) {
    return this.appService.handleMessage(body);
  }
}

