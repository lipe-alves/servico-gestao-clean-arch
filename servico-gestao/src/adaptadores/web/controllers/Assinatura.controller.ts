import { Controller, UsePipes } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { EVENTOS, MENSAGENS } from '@gestao-internet/comuns/constantes';

import { AssinaturaStatus } from 'src/adaptadores/persistencia/entidades/Assinatura.entidade';

import BuscarAssinaturaCasoUso from 'src/aplicacao/casos-uso/assinaturas/BuscarAssinaturas.casoUso';
import {
  BuscarAssinaturasDto,
  BuscarAssinaturasDtoSchema,
} from 'src/aplicacao/dtos/assinaturas/BuscarAssinaturas.dto';

import CadastrarAssinaturaCasoUso from 'src/aplicacao/casos-uso/assinaturas/CadastrarAssinatura.casoUso';
import {
  CadastrarAssinaturaDto,
  CadastrarAssinaturaDtoSchema,
} from 'src/aplicacao/dtos/assinaturas/CadastrarAssinatura.dto';

import AtualizarAssinaturaCasoUso from 'src/aplicacao/casos-uso/assinaturas/AtualizarAssinatura.casoUso';
import {
  AtualizarAssinaturaDto,
  AtualizarAssinaturaDtoSchema,
} from 'src/aplicacao/dtos/assinaturas/AtualizarAssinatura.dto';

import ExcluirAssinaturaCasoUso from 'src/aplicacao/casos-uso/assinaturas/ExcluirAssinatura.casoUso';

import AssinaturaServico from 'src/dominios/servicos/Assinatura.servico';

import ValidatorPipe from '../pipes/Validator.pipe';

@Controller()
class AssinaturaController {
  private readonly assinaturaServico: AssinaturaServico;
  private readonly buscarAssinaturasCasoUso: BuscarAssinaturaCasoUso;
  private readonly cadastrarAssinaturaCasoUso: CadastrarAssinaturaCasoUso;
  private readonly excluirAssinaturaCasoUso: ExcluirAssinaturaCasoUso;
  private readonly atualizarAssinaturaCasoUso: AtualizarAssinaturaCasoUso;

  public constructor(
    assinaturaServico: AssinaturaServico,
    buscarAssinaturasCasoUso: BuscarAssinaturaCasoUso,
    cadastrarAssinaturaCasoUso: CadastrarAssinaturaCasoUso,
    excluirAssinaturaCasoUso: ExcluirAssinaturaCasoUso,
    atualizarAssinaturaCasoUso: AtualizarAssinaturaCasoUso
  ) {
    this.assinaturaServico = assinaturaServico;
    this.buscarAssinaturasCasoUso = buscarAssinaturasCasoUso;
    this.cadastrarAssinaturaCasoUso = cadastrarAssinaturaCasoUso;
    this.excluirAssinaturaCasoUso = excluirAssinaturaCasoUso;
    this.atualizarAssinaturaCasoUso = atualizarAssinaturaCasoUso;
  }

  @MessagePattern(MENSAGENS.BUSCAR_ASSINATURAS)
  @UsePipes(new ValidatorPipe(BuscarAssinaturasDtoSchema))
  public async buscarAssinaturas(@Payload() params: BuscarAssinaturasDto) {
    const assinaturas = await this.buscarAssinaturasCasoUso.executar(params);
    return assinaturas.map((assinatura) => assinatura.paraJson());
  }

  @MessagePattern(MENSAGENS.CADASTRAR_ASSINATURA)
  @UsePipes(new ValidatorPipe(CadastrarAssinaturaDtoSchema))
  public async cadastrarAssinatura(@Payload() dados: CadastrarAssinaturaDto) {
    const assinatura = await this.cadastrarAssinaturaCasoUso.executar(dados);
    return assinatura.paraJson();
  }

  @MessagePattern(MENSAGENS.ATUALIZAR_ASSINATURA)
  @UsePipes(new ValidatorPipe(AtualizarAssinaturaDtoSchema))
  public async atualizarAssinatura(@Payload() dados: AtualizarAssinaturaDto) {
    const assinatura = await this.atualizarAssinaturaCasoUso.executar(dados);
    return assinatura.paraJson();
  }

  @MessagePattern(MENSAGENS.EXCLUIR_ASSINATURA)
  public async excluirAssinatura(@Payload() id: number) {
    await this.excluirAssinaturaCasoUso.executar(id);
    return {
      sucesso: true,
      mensagem: 'Assinatura excluída com sucesso',
    };
  }

  @EventPattern(EVENTOS.PAGAMENTO_REGISTRADO)
  public async aoPagarAssinatura(
    @Payload()
    dados: {
      codAssinatura: number;
      dataPagamento: string;
      valorPago: number;
    }
  ) {
    console.log('Evento recebido: PAGAMENTO_REGISTRADO');
    console.log('dados', dados);
    try {
      await this.assinaturaServico.atualizar(dados.codAssinatura, {
        dataUltimoPagamento: dados.dataPagamento,
      });
    } catch (error) {
      console.error('Erro ao atualizar assinatura:', error);
    }
  }
}

export default AssinaturaController;
export { AssinaturaController };
