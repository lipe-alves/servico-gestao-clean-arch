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
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
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
