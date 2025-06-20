import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const origin = configService.get<string>('ORIGIN_ALLOW');
  app.use(cors({ origin, credentials: true }));
  app.useGlobalPipes(new ValidationPipe());
  const port = configService.get<number>('PORT') || 3000;

  await app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
}
bootstrap();
