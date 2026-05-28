import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FILAS } from '@gestao-internet/comuns/constantes';

import { FaturamentoController } from '../web/controllers/Faturamento.controller';
import { FaturamentoService } from '../../dominios/servicos/Faturamento.service';

import PagamentoEntidade from '../persistencia/entidades/Pagamento.entidade';
import PagamentoRepositorio from '../persistencia/repositorios/Pagamento.repositorio';

@Module({
  imports: [
    TypeOrmModule.forFeature([PagamentoEntidade]),
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
  controllers: [FaturamentoController],
  providers: [FaturamentoService, PagamentoRepositorio],
})
class FaturamentoModule {}

export default FaturamentoModule;
export { FaturamentoModule };
