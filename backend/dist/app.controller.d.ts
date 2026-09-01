import { AppService } from './app.service.js';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): {
        message: string;
        timestamp: string;
    };
    getStatus(): {
        status: string;
        port: number | string;
        message: string;
        timestamp: string;
        environment: string;
    };
    sendMessage(body: {
        message?: string;
    }): {
        received: boolean;
        echo: string;
        timestamp: string;
    };
}
