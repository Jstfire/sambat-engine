// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Gunakan Helmet untuk mengamankan header HTTP
  app.use(helmet());

  // Terapkan rate limiting
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 menit
      max: 100, // limit setiap IP ke 100 request per windowMs
    }),
  );

  // Aktifkan CORS dengan opsi yang sesuai
  app.enableCors({
    // origin: ['http://localhost:3000'], // Ganti dengan domain frontend Anda
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  await app.listen(3000);
}
bootstrap();
