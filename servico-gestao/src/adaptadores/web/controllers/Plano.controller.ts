import { Controller, UsePipes } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MENSAGENS } from '@gestao-internet/comuns/constantes';

import BuscarPlanoCasoUso from 'src/aplicacao/casos-uso/planos/BuscarPlanos.casoUso';
import {
  BuscarPlanosDto,
  BuscarPlanosDtoSchema,
} from 'src/aplicacao/dtos/planos/BuscarPlanos.dto';

import AtualizarPlanoCasoUso from 'src/aplicacao/casos-uso/planos/AtualizarPlano.casoUso';
import {
  AtualizarPlanoDto,
  AtualizarPlanoDtoSchema,
} from 'src/aplicacao/dtos/planos/AtualizarPlano.dto';

import CadastrarPlanoCasoUso from 'src/aplicacao/casos-uso/planos/CadastrarPlano.casoUso';
import {
  CadastrarPlanoDto,
  CadastrarPlanoDtoSchema,
} from 'src/aplicacao/dtos/planos/CadastrarPlano.dto';

import ExcluirPlanoCasoUso from 'src/aplicacao/casos-uso/planos/ExcluirPlano.casoUso';

import ValidatorPipe from '../pipes/Validator.pipe';

@Controller()
class PlanoController {
  private readonly buscarPlanosCasoUso: BuscarPlanoCasoUso;
  private readonly cadastrarPlanoCasoUso: CadastrarPlanoCasoUso;
  private readonly excluirPlanoCasoUso: ExcluirPlanoCasoUso;
  private readonly atualizarPlanoCasoUso: AtualizarPlanoCasoUso;

  public constructor(
    buscarPlanosCasoUso: BuscarPlanoCasoUso,
    cadastrarPlanoCasoUso: CadastrarPlanoCasoUso,
    excluirPlanoCasoUso: ExcluirPlanoCasoUso,
    atualizarPlanoCasoUso: AtualizarPlanoCasoUso
  ) {
    this.buscarPlanosCasoUso = buscarPlanosCasoUso;
    this.cadastrarPlanoCasoUso = cadastrarPlanoCasoUso;
    this.excluirPlanoCasoUso = excluirPlanoCasoUso;
    this.atualizarPlanoCasoUso = atualizarPlanoCasoUso;
  }

  @MessagePattern(MENSAGENS.BUSCAR_PLANOS)
  @UsePipes(new ValidatorPipe(BuscarPlanosDtoSchema))
  public async buscarPlanos(@Payload() params: BuscarPlanosDto = {}) {
    const planos = await this.buscarPlanosCasoUso.executar(params);
    return planos.map((plano) => plano.paraJson());
  }

  @MessagePattern(MENSAGENS.CADASTRAR_PLANO)
  @UsePipes(new ValidatorPipe(CadastrarPlanoDtoSchema))
  public async cadastrarPlano(@Payload() dados: CadastrarPlanoDto) {
    const plano = await this.cadastrarPlanoCasoUso.executar(dados);
    return plano.paraJson();
  }

  @MessagePattern(MENSAGENS.ATUALIZAR_PLANO)
  @UsePipes(new ValidatorPipe(AtualizarPlanoDtoSchema))
  public async atualizarPlano(@Payload() dados: AtualizarPlanoDto) {
    const plano = await this.atualizarPlanoCasoUso.executar(dados);
    return plano.paraJson();
  }

  @MessagePattern(MENSAGENS.EXCLUIR_PLANO)
  public async excluirPlano(@Payload() id: number) {
    await this.excluirPlanoCasoUso.executar(id);
    return {
      sucesso: true,
      mensagem: 'Plano excluído com sucesso',
    };
  }
}

export default PlanoController;
export { PlanoController };
