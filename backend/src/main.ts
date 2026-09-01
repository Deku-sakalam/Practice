import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS so the React frontend can communicate with this backend
  app.enableCors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:2000', 'http://127.0.0.1:2000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
  });

  const port = process.env.PORT ?? 2000;
  await app.listen(port, '0.0.0.0');
  console.log(`🚀 NestJS Backend is running on http://localhost:${port}`);
}
await bootstrap();
