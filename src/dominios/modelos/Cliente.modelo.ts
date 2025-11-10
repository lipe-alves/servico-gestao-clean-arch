import ModeloBase from 'src/comuns/ModeloBase';
import { Json } from 'src/comuns/tipos';
import ClienteEntidade from 'src/adaptadores/persistencia/entidades/Cliente.entidade';

class ClienteModelo extends ModeloBase<ClienteEntidade> {
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

  public get email() {
    return this.dados.email;
  }

  public set email(email: string) {
    this.dados.email = email;
  }

  public paraJson(): Json<ClienteEntidade> {
    return {
      codigo: this.codigo,
      nome: this.nome,
      email: this.email,
    };
  }

  public static criar(dados: ClienteEntidade): ClienteModelo {
    return new ClienteModelo(dados);
  }
}

export default ClienteModelo;
export { ClienteModelo };
