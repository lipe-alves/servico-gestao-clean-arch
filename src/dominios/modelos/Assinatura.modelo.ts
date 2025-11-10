import ModeloBase from 'src/comuns/ModeloBase';
import { Json } from 'src/comuns/tipos';
import AssinaturaEntidade, { AssinaturaStatus } from 'src/adaptadores/persistencia/entidades/Assinatura.entidade';

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

  public get status() {
    return this.dados.status;
  }

  public set status(status: AssinaturaStatus) {
    this.dados.status = status;
  }

  public get dataUltimoPagamento() {
    return this.dados.dataUltimoPagamento;
  }

  public set dataUltimoPagamento(dataUltimoPagamento: Date) {
    this.dados.dataUltimoPagamento = dataUltimoPagamento;
  }

  public get inicioFidelidade() {
    return this.dados.inicioFidelidade;
  }

  public set inicioFidelidade(inicioFidelidade: Date) {
    this.dados.inicioFidelidade = inicioFidelidade;
  }

  public get fimFidelidade() {
    return this.dados.fimFidelidade;
  }

  public set fimFidelidade(fimFidelidade: Date) {
    this.dados.fimFidelidade = fimFidelidade;
  }

  public get custoFinal() {
    return this.dados.custoFinal;
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

  public paraJson(): Json<AssinaturaEntidade> {
    return {
      codigo: this.codigo,
      codCliente: this.codCliente,
      cliente: this.cliente,
      codPlano: this.codPlano,
      status: this.status,
      plano: this.plano,
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
