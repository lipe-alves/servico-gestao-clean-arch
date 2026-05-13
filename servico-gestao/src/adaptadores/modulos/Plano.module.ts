import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import PlanoController from 'src/adaptadores/web/controllers/Plano.controller';

import BuscarPlanoCasoUso from 'src/aplicacao/casos-uso/planos/BuscarPlanos.casoUso';
import CadastrarPlanoCasoUso from 'src/aplicacao/casos-uso/planos/CadastrarPlano.casoUso';
import AtualizarPlanoCasoUso from 'src/aplicacao/casos-uso/planos/AtualizarPlano.casoUso';
import ExcluirPlanoCasoUso from 'src/aplicacao/casos-uso/planos/ExcluirPlano.casoUso';

import PlanoServico from 'src/dominios/servicos/Plano.servico';
import PlanoRepositorio from 'src/adaptadores/persistencia/repositorios/Plano.repositorio';
import PlanoEntidade from 'src/adaptadores/persistencia/entidades/Plano.entidade';

@Module({
  providers: [
    BuscarPlanoCasoUso,
    CadastrarPlanoCasoUso,
    ExcluirPlanoCasoUso,
    AtualizarPlanoCasoUso,
    PlanoServico,
    PlanoRepositorio,
  ],
  controllers: [PlanoController],
  imports: [TypeOrmModule.forFeature([PlanoEntidade])],
  exports: [PlanoServico],
})
class PlanoModule {}

export { PlanoModule };
