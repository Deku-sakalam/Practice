var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@nestjs/common';
let AppService = class AppService {
    getHello() {
        return {
            message: 'Hello from NestJS Backend!',
            timestamp: new Date().toISOString(),
        };
    }
    getStatus() {
        return {
            status: 'online',
            port: process.env.PORT ?? 2000,
            message: 'Backend is running and successfully connected to frontend!',
            timestamp: new Date().toISOString(),
            environment: process.env.NODE_ENV ?? 'development',
        };
    }
    handleMessage(data) {
        const text = data?.message?.trim() || 'No message provided';
        return {
            received: true,
            echo: `NestJS received: "${text}"`,
            timestamp: new Date().toISOString(),
        };
    }
};
AppService = __decorate([
    Injectable()
], AppService);
export { AppService };
//# sourceMappingURL=app.service.js.map