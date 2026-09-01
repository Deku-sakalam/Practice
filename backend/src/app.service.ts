import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): { message: string; timestamp: string } {
    return {
      message: 'Hello from NestJS Backend!',
      timestamp: new Date().toISOString(),
    };
  }

  getStatus(): {
    status: string;
    port: number | string;
    message: string;
    timestamp: string;
    environment: string;
  } {
    return {
      status: 'online',
      port: process.env.PORT ?? 2000,
      message: 'Backend is running and successfully connected to frontend!',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV ?? 'development',
    };
  }

  handleMessage(data: { message?: string }): {
    received: boolean;
    echo: string;
    timestamp: string;
  } {
    const text = data?.message?.trim() || 'No message provided';
    return {
      received: true,
      echo: `NestJS received: "${text}"`,
      timestamp: new Date().toISOString(),
    };
  }
}
