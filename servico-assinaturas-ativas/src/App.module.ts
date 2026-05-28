import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-ioredis-yet';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { FILAS } from '@gestao-internet/comuns/constantes';

import CacheAssinaturas from './servicos/CacheAssinaturas.servico';
import AppController from './controllers/App.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        ttl: configService.getOrThrow<number>('CACHE_TTL'),
      }),
    }),
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
  ],
  providers: [CacheAssinaturas],
  controllers: [AppController],
})
class AppModule {}

export { AppModule };
export default AppModule;
