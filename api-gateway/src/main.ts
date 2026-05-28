import { NestFactory } from '@nestjs/core';
import { AppModule } from './App.module';
import { ExcecaoFilter } from './filters';
import { TransformaStatusInterceptor, LoggerInterceptor } from './interceptors';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new ExcecaoFilter());
  app.useGlobalInterceptors(
    new LoggerInterceptor(),
    new TransformaStatusInterceptor()
  );

  await app.listen(process.env.PORT);
}

bootstrap();
