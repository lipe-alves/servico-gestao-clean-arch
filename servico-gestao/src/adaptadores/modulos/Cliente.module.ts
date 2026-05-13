import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import ClienteController from 'src/adaptadores/web/controllers/Cliente.controller';

import BuscarClienteCasoUso from 'src/aplicacao/casos-uso/clientes/BuscarClientes.casoUso';
import CadastrarClienteCasoUso from 'src/aplicacao/casos-uso/clientes/CadastrarCliente.casoUso';
import AtualizarClienteCasoUso from 'src/aplicacao/casos-uso/clientes/AtualizarCliente.casoUso';
import ExcluirClienteCasoUso from 'src/aplicacao/casos-uso/clientes/ExcluirCliente.casoUso';

import ClienteServico from 'src/dominios/servicos/Cliente.servico';
import ClienteRepositorio from 'src/adaptadores/persistencia/repositorios/Cliente.repositorio';
import ClienteEntidade from 'src/adaptadores/persistencia/entidades/Cliente.entidade';

@Module({
  providers: [
    BuscarClienteCasoUso,
    CadastrarClienteCasoUso,
    ExcluirClienteCasoUso,
    AtualizarClienteCasoUso,
    ClienteServico,
    ClienteRepositorio,
  ],
  controllers: [ClienteController],
  imports: [TypeOrmModule.forFeature([ClienteEntidade])],
  exports: [ClienteServico],
})
class ClienteModule {}

export { ClienteModule };
