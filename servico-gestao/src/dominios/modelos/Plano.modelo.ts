import ModeloBase from 'src/comuns/ModeloBase';
import { Json } from 'src/comuns/tipos';
import PlanoEntidade from 'src/adaptadores/persistencia/entidades/Plano.entidade';

class PlanoModelo extends ModeloBase<PlanoEntidade> {
  public get codigo() {
    return this.dados.codigo;
  }

  public set codigo(codigo: number) {
    this.dados.codigo = codigo;
  }

  public get nome() {
    return this.dados.nome;
  }

  public set nome(nome: string) {
    this.dados.nome = nome;
  }

  public get custoMensal() {
    return this.dados.custoMensal;
  }

  public set custoMensal(custoMensal: number) {
    this.dados.custoMensal = custoMensal;
  }

  public get data() {
    return this.dados.data;
  }

  public set data(data: Date) {
    this.dados.data = data;
  }

  public get descricao() {
    return this.dados.descricao;
  }

  public set descricao(descricao: string) {
    this.dados.descricao = descricao;
  }

  public paraJson(): Json<PlanoEntidade> {
    return {
      codigo: this.codigo,
      nome: this.nome,
      custoMensal: this.custoMensal,
      data: this.data,
      descricao: this.descricao,
    };
  }

  public static criar(dados: PlanoEntidade): PlanoModelo {
    return new PlanoModelo(dados);
  }
}

export default PlanoModelo;
export { PlanoModelo };
