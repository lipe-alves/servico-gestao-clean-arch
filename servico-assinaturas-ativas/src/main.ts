import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';
import { FILAS } from '@gestao-internet/comuns/constantes';

import { AppModule } from './App.module';
import { ExcecaoFilter } from './filters';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL],
      queue: FILAS.ASSINATURAS_ATIVAS,
    },
  });

  app.useGlobalFilters(new ExcecaoFilter());

  await app.listen();
}

bootstrap();
