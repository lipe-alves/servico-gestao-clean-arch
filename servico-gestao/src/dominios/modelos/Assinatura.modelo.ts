import ModeloBase from '@gestao-internet/comuns/ModeloBase';
import { Json } from '@gestao-internet/comuns/tipos';
import AssinaturaEntidade, {
  AssinaturaStatus,
} from 'src/adaptadores/persistencia/entidades/Assinatura.entidade';

type JsonAssinatura = Json<AssinaturaEntidade> & {
  status: AssinaturaStatus;
};

class AssinaturaModelo extends ModeloBase<AssinaturaEntidade> {
  public get codigo() {
    return this.dados.codigo;
  }

  public set codigo(codigo: number) {
    this.dados.codigo = codigo;
  }

  public get codCliente() {
    return this.dados.codCliente;
  }

  public get cliente() {
    return this.dados.cliente;
  }

  public get codPlano() {
    return this.dados.codPlano;
  }

  public get plano() {
    return this.dados.plano;
  }

  public get diaVencimento() {
    return Number(this.dados.diaVencimento);
  }

  public set diaVencimento(diaVencimento: number) {
    diaVencimento = Math.max(1, diaVencimento);
    diaVencimento = Math.min(diaVencimento, 31);
    this.dados.diaVencimento = diaVencimento;
  }

  public get dataVencimento() {
    const hoje = new Date();
    const dataVencimento = new Date(hoje);
    dataVencimento.setDate(this.diaVencimento);

    // Ex: diaVencimento = 31 e é o mês de fevereiro
    if (dataVencimento.getMonth() !== hoje.getMonth()) {
      // Coloca como padrão o último dia do mês
      dataVencimento.setDate(1);
      dataVencimento.setDate(dataVencimento.getDate() - 1);
    }

    return dataVencimento.toISOString().split('T')[0];
  }

  public get status() {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const fimFidelidade = new Date(this.fimFidelidade);
    fimFidelidade.setHours(23, 59, 59, 999);

    if (hoje > fimFidelidade) {
      return AssinaturaStatus.Cancelado;
    }

    const dataUltimoPagamento = this.dataUltimoPagamento
      ? new Date(this.dataUltimoPagamento)
      : undefined;
    const dataVencimento = new Date(this.dataVencimento);
    dataVencimento.setHours(23, 59, 59, 999);

    if (!dataUltimoPagamento) {
      return hoje <= dataVencimento
        ? AssinaturaStatus.Pendente
        : AssinaturaStatus.Vencido;
    }

    const mesPagamento = dataUltimoPagamento.getMonth();
    const anoPagamento = dataUltimoPagamento.getFullYear();

    const mesAtual = hoje.getMonth();
    const anoAtual = hoje.getFullYear();

    const competenciaAtual = `${mesAtual}/${anoAtual}`;
    const competenciaPagamento = `${mesPagamento}/${anoPagamento}`;

    if (competenciaAtual !== competenciaPagamento) {
      return hoje <= dataVencimento
        ? AssinaturaStatus.Pendente
        : AssinaturaStatus.Vencido;
    }

    return AssinaturaStatus.Ativo;
  }

  public get dataUltimoPagamento() {
    return this.dados.dataUltimoPagamento;
  }

  public set dataUltimoPagamento(
    dataUltimoPagamento: string | null | undefined
  ) {
    this.dados.dataUltimoPagamento = dataUltimoPagamento;
  }

  public get inicioFidelidade() {
    return this.dados.inicioFidelidade;
  }

  public set inicioFidelidade(inicioFidelidade: string) {
    this.dados.inicioFidelidade = inicioFidelidade;
  }

  public get fimFidelidade() {
    return this.dados.fimFidelidade;
  }

  public set fimFidelidade(fimFidelidade: string) {
    this.dados.fimFidelidade = fimFidelidade;
  }

  public get custoFinal() {
    return Number(this.dados.custoFinal);
  }

  public set custoFinal(custoFinal: number) {
    this.dados.custoFinal = custoFinal;
  }

  public get descricao() {
    return this.dados.descricao;
  }

  public set descricao(descricao: string) {
    this.dados.descricao = descricao;
  }

  public paraJson(): JsonAssinatura {
    return {
      codigo: this.codigo,
      codCliente: this.codCliente,
      cliente: this.cliente,
      codPlano: this.codPlano,
      status: this.status,
      plano: this.plano,
      diaVencimento: this.diaVencimento,
      inicioFidelidade: this.inicioFidelidade,
      fimFidelidade: this.fimFidelidade,
      custoFinal: this.custoFinal,
      dataUltimoPagamento: this.dataUltimoPagamento,
      descricao: this.descricao,
    };
  }

  public static criar(dados: AssinaturaEntidade): AssinaturaModelo {
    return new AssinaturaModelo(dados);
  }
}

export default AssinaturaModelo;
export { AssinaturaModelo };
