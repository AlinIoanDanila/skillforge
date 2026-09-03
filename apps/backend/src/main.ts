import cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';

import { AppModule } from '@/app.module';
import { ConsoleLogger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      prefix: 'Skillforge BE',
      colors: true,
      json: true,
    }),
  });

  app.enableCors({ origin: 'http://localhost:3000', credentials: true });

  app.use(cookieParser());

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
