import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { FILAS } from '@gestao-internet/comuns/constantes';

import AssinaturaController from './controllers/Assinatura.controller';
import ClienteController from './controllers/Cliente.controller';
import PlanoController from './controllers/Plano.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ClientsModule.registerAsync([
      {
        name: FILAS.FATURAMENTO,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.getOrThrow<string>('RABBITMQ_URL')],
            queue: FILAS.FATURAMENTO,
          },
        }),
      },
    ]),
    ClientsModule.registerAsync([
      {
        name: FILAS.GESTAO,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.getOrThrow<string>('RABBITMQ_URL')],
            queue: FILAS.GESTAO,
          },
        }),
      },
    ]),
    ClientsModule.registerAsync([
      {
        name: FILAS.ASSINATURAS_ATIVAS,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.getOrThrow<string>('RABBITMQ_URL')],
            queue: FILAS.ASSINATURAS_ATIVAS,
          },
        }),
      },
    ]),
  ],
  controllers: [AssinaturaController, ClienteController, PlanoController],
})
export class AppModule {}
