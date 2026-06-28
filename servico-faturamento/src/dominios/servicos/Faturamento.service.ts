import { Dependencies, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { EVENTOS, FILAS } from '@gestao-internet/comuns/constantes';
import ServicoBase from '@gestao-internet/comuns/ServicoBase';

import PagamentoEntidade from 'src/adaptadores/persistencia/entidades/Pagamento.entidade';
import PagamentoModelo from '../modelos/Pagamento.modelo';
import PagamentoRepositorio from 'src/adaptadores/persistencia/repositorios/Pagamento.repositorio';

import { RegistrarPagamentoDto } from '../dtos/RegistrarPagamento.dto';

@Injectable()
@Dependencies(PagamentoRepositorio, FILAS.GESTAO)
class FaturamentoService extends ServicoBase<
  PagamentoEntidade,
  PagamentoModelo
> {
  private readonly fila: ClientProxy;

  public constructor(repo: PagamentoRepositorio, fila: ClientProxy) {
    super(repo, PagamentoModelo.criar);
    this.fila = fila;
  }

  public async registrarPagamento(dados: RegistrarPagamentoDto) {
    const [dataPagamento] = dados.dataPagamento.toISOString().split("T");

    const pagamento = new PagamentoModelo({
      codAssinatura: dados.codAssinatura,
      dataPagamento,
      valorPago: dados.valorPago,
    });

    await super.criar(pagamento.paraJson());

    await lastValueFrom(
      this.fila.emit(EVENTOS.PAGAMENTO_REGISTRADO, {
        codAssinatura: pagamento.codAssinatura,
        dataPagamento: pagamento.dataPagamento,
        valorPago: pagamento.valorPago,
      })
    );
  }
}

export default FaturamentoService;
export { FaturamentoService };
