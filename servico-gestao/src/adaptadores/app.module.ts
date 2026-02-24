import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import PlanoController from './web/controllers/Plano.controller';
import BuscarPlanoCasoUso from '../aplicacao/casos-uso/planos/BuscarPlanos.casoUso';
import CadastrarPlanoCasoUso from 'src/aplicacao/casos-uso/planos/CadastrarPlano.casoUso';
import AtualizarPlanoCasoUso from 'src/aplicacao/casos-uso/planos/AtualizarPlano.casoUso';
import ExcluirPlanoCasoUso from 'src/aplicacao/casos-uso/planos/ExcluirPlano.casoUso';
import PlanoServico from '../dominios/servicos/Plano.servico';
import PlanoRepositorio from './persistencia/repositorios/Plano.repositorio';
import PlanoEntidade from './persistencia/entidades/Plano.entidade';

import ClienteController from './web/controllers/Cliente.controller';
import BuscarClienteCasoUso from '../aplicacao/casos-uso/clientes/BuscarClientes.casoUso';
import CadastrarClienteCasoUso from 'src/aplicacao/casos-uso/clientes/CadastrarCliente.casoUso';
import AtualizarClienteCasoUso from 'src/aplicacao/casos-uso/clientes/AtualizarCliente.casoUso';
import ExcluirClienteCasoUso from 'src/aplicacao/casos-uso/clientes/ExcluirCliente.casoUso';
import ClienteServico from '../dominios/servicos/Cliente.servico';
import ClienteRepositorio from './persistencia/repositorios/Cliente.repositorio';
import ClienteEntidade from './persistencia/entidades/Cliente.entidade';

import AssinaturaController from './web/controllers/Assinatura.controller';
import BuscarAssinaturaCasoUso from '../aplicacao/casos-uso/assinaturas/BuscarAssinaturas.casoUso';
import CadastrarAssinaturaCasoUso from 'src/aplicacao/casos-uso/assinaturas/CadastrarAssinatura.casoUso';
import AtualizarAssinaturaCasoUso from 'src/aplicacao/casos-uso/assinaturas/AtualizarAssinatura.casoUso';
import ExcluirAssinaturaCasoUso from 'src/aplicacao/casos-uso/assinaturas/ExcluirAssinatura.casoUso';
import AssinaturaServico from '../dominios/servicos/Assinatura.servico';
import AssinaturaRepositorio from './persistencia/repositorios/Assinatura.repositorio';
import AssinaturaEntidade from './persistencia/entidades/Assinatura.entidade';

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
  ],
  controllers: [
    PlanoController,
    ClienteController,
    AssinaturaController
  ],
  providers: [
    BuscarClienteCasoUso,
    CadastrarClienteCasoUso,
    ExcluirClienteCasoUso,
    AtualizarClienteCasoUso,
    ClienteServico,
    ClienteRepositorio,

    BuscarPlanoCasoUso,
    CadastrarPlanoCasoUso,
    ExcluirPlanoCasoUso,
    AtualizarPlanoCasoUso,
    PlanoServico,
    PlanoRepositorio,

    BuscarAssinaturaCasoUso,
    CadastrarAssinaturaCasoUso,
    AtualizarAssinaturaCasoUso,
    ExcluirAssinaturaCasoUso,
    AssinaturaServico,
    AssinaturaRepositorio,
  ],
})
export class AppModule {}
