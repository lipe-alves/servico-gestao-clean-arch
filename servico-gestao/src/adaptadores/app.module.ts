import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import PlanoEntidade from './persistencia/entidades/Plano.entidade';
import ClienteEntidade from './persistencia/entidades/Cliente.entidade';
import AssinaturaEntidade from './persistencia/entidades/Assinatura.entidade';

import { AssinaturaModule, ClienteModule, PlanoModule } from './modulos';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.getOrThrow<string>('DB_HOST'),
        port: configService.getOrThrow<number>('DB_PORT'),
        username: configService.getOrThrow<string>('DB_USERNAME'),
        password: configService.getOrThrow<string>('DB_PASSWORD'),
        database: configService.getOrThrow<string>('DB_NAME'),
        entities: [__dirname + '/**/*.entidade{.ts,.js}'],
        synchronize: false,
      }),
    }),
    TypeOrmModule.forFeature([
      ClienteEntidade,
      PlanoEntidade,
      AssinaturaEntidade,
    ]),
    AssinaturaModule,
    ClienteModule,
    PlanoModule,
  ],
})
export class AppModule {}
