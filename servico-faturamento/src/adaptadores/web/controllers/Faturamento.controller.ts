import { Controller, UsePipes } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MENSAGENS } from '@gestao-internet/comuns/constantes';

import { FaturamentoService } from 'src/dominios/servicos/Faturamento.service';
import {
  RegistrarPagamentoDtoSchema,
  RegistrarPagamentoDto,
} from 'src/dominios/dtos/RegistrarPagamento.dto';
import ValidatorPipe from 'src/adaptadores/web/pipes/Validator.pipe';

@Controller()
class FaturamentoController {
  constructor(private readonly faturamentoServico: FaturamentoService) {}

  @MessagePattern(MENSAGENS.REGISTRAR_PAGAMENTO)
  @UsePipes(new ValidatorPipe(RegistrarPagamentoDtoSchema))
  public async registrarPagamento(@Payload() dados: RegistrarPagamentoDto) {
    try {
      console.log(
        'servico-faturamento - MENSAGENS.REGISTRAR_PAGAMENTO recebido',
        dados
      );
      await this.faturamentoServico.registrarPagamento(dados);
      return {
        sucesso: true,
        mensagem: 'Pagamento registrado com sucesso!',
      };
    } catch (error) {
      console.error('Erro ao registrar pagamento:', error);
      throw error;
    }
  }
}

export default FaturamentoController;
export { FaturamentoController };
