import ModeloBase from '@gestao-internet/comuns/ModeloBase';
import { Json } from '@gestao-internet/comuns/tipos';
import PagamentoEntidade from 'src/adaptadores/persistencia/entidades/Pagamento.entidade';

class PagamentoModelo extends ModeloBase<PagamentoEntidade> {
  public get codAssinatura() {
    return this.dados.codAssinatura;
  }

  public set codAssinatura(codAssinatura: number) {
    this.dados.codAssinatura = codAssinatura;
  }

  public get dataPagamento() {
    return this.dados.dataPagamento;
  }

  public set dataPagamento(dataPagamento: string) {
    this.dados.dataPagamento = dataPagamento;
  }

  public get valorPago() {
    return this.dados.valorPago;
  }

  public set valorPago(valorPago: number) {
    this.dados.valorPago = valorPago;
  }

  public paraJson(): Json<PagamentoEntidade> {
    return {
      codAssinatura: this.codAssinatura,
      dataPagamento: this.dataPagamento,
      valorPago: this.valorPago,
    };
  }

  public static criar(dados: PagamentoEntidade): PagamentoModelo {
    return new PagamentoModelo(dados);
  }
}

export default PagamentoModelo;
export { PagamentoModelo };
