import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { FILAS } from '@gestao-internet/comuns/constantes';
import * as dotenv from 'dotenv';

import { AppModule } from './adaptadores/App.module';
import { ExcecaoFilter } from './adaptadores/web/filters';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL],
      queue: FILAS.GESTAO,
    },
  });

  app.useGlobalFilters(new ExcecaoFilter());

  await app.listen();
}

bootstrap();
