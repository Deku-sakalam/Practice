export declare class AppService {
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
    handleMessage(data: {
        message?: string;
    }): {
        received: boolean;
        echo: string;
        timestamp: string;
    };
}
