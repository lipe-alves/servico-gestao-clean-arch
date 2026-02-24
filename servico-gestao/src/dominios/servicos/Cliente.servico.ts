import { Injectable } from '@nestjs/common';
import ServicoBase from 'src/comuns/ServicoBase';

import ClienteEntidade from 'src/adaptadores/persistencia/entidades/Cliente.entidade';
import ClienteModelo from '../modelos/Cliente.modelo';
import ClienteRepositorio from 'src/adaptadores/persistencia/repositorios/Cliente.repositorio';

import validarEmail from 'src/comuns/utils/validarEmail';

@Injectable()
class ClienteServico extends ServicoBase<ClienteEntidade, ClienteModelo> {
  public constructor(repo: ClienteRepositorio) {
    super(repo, ClienteModelo.criar);
  }

  public async atualizar(id: number, dados: Partial<ClienteEntidade>): Promise<ClienteModelo> {
    if (typeof dados.nome === "string" && !dados.nome) throw new Error("O nome não pode ser vazio!");
    if (typeof dados.email === "string" && !validarEmail(dados.email)) throw new Error("Email inválido!");

    return super.atualizar(id, dados);
  }

  public async criar(dados: Omit<ClienteEntidade, 'codigo'>): Promise<ClienteModelo> {
    if (!dados.nome) throw new Error("O nome não pode ser vazio!");
    if (!dados.email) throw new Error("O email não pode ser vazio!");
    if (!validarEmail(dados.email)) throw new Error("Email inválido!");

    return super.criar(dados);
  }
}

export default ClienteServico;
export { ClienteServico };
