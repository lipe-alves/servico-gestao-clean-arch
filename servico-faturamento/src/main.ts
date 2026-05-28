import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';
import { FILAS } from '@gestao-internet/comuns/constantes';

import { AppModule } from './adaptadores/App.module';
import { ExcecaoFilter } from './adaptadores/web/filters';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL],
      queue: FILAS.FATURAMENTO,
    },
  });
  
  app.useGlobalFilters(new ExcecaoFilter());

  await app.listen();
}

bootstrap();
