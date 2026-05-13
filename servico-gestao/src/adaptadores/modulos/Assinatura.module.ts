import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import AssinaturaController from 'src/adaptadores/web/controllers/Assinatura.controller';

import BuscarAssinaturaCasoUso from 'src/aplicacao/casos-uso/assinaturas/BuscarAssinaturas.casoUso';
import CadastrarAssinaturaCasoUso from 'src/aplicacao/casos-uso/assinaturas/CadastrarAssinatura.casoUso';
import AtualizarAssinaturaCasoUso from 'src/aplicacao/casos-uso/assinaturas/AtualizarAssinatura.casoUso';
import ExcluirAssinaturaCasoUso from 'src/aplicacao/casos-uso/assinaturas/ExcluirAssinatura.casoUso';

import AssinaturaServico from 'src/dominios/servicos/Assinatura.servico';
import AssinaturaRepositorio from 'src/adaptadores/persistencia/repositorios/Assinatura.repositorio';
import AssinaturaEntidade from 'src/adaptadores/persistencia/entidades/Assinatura.entidade';

import { ClienteModule } from './Cliente.module';
import { PlanoModule } from './Plano.module';

@Module({
  providers: [
    BuscarAssinaturaCasoUso,
    CadastrarAssinaturaCasoUso,
    ExcluirAssinaturaCasoUso,
    AtualizarAssinaturaCasoUso,
    AssinaturaServico,
    AssinaturaRepositorio,
  ],
  controllers: [AssinaturaController],
  exports: [AssinaturaServico],
  imports: [
    TypeOrmModule.forFeature([AssinaturaEntidade]),
    ClienteModule,
    PlanoModule,
  ],
})
class AssinaturaModule {}

export { AssinaturaModule };
