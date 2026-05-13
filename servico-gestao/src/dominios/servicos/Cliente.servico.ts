import { Injectable } from '@nestjs/common';
import ServicoBase from 'src/dominios/base/ServicoBase';

import ClienteEntidade from 'src/adaptadores/persistencia/entidades/Cliente.entidade';
import ClienteModelo from 'src/dominios/modelos/Cliente.modelo';
import ClienteRepositorio from 'src/adaptadores/persistencia/repositorios/Cliente.repositorio';

import validarEmail from 'src/comuns/utils/validarEmail';

import {
  EmailInvalidoException,
  EmailVazioException,
  NomeVazioException,
  ClienteNaoEncontradoException,
} from 'src/dominios/excecoes/cliente';

@Injectable()
class ClienteServico extends ServicoBase<ClienteEntidade, ClienteModelo> {
  public constructor(repo: ClienteRepositorio) {
    super(repo, ClienteModelo.criar);
  }

  public async atualizar(
    id: number,
    dados: Partial<ClienteEntidade>
  ): Promise<ClienteModelo> {
    const cliente = await this.buscarPorId(id);
    if (!cliente) {
      throw new ClienteNaoEncontradoException();
    }
    if (typeof dados.nome === 'string' && !dados.nome) {
      throw new NomeVazioException();
    }
    if (typeof dados.email === 'string' && !validarEmail(dados.email)) {
      throw new EmailInvalidoException();
    }

    return super.atualizar(id, dados);
  }

  public async criar(
    dados: Omit<ClienteEntidade, 'codigo'>
  ): Promise<ClienteModelo> {
    if (!dados.nome) {
      throw new NomeVazioException();
    }
    if (!dados.email) {
      throw new EmailVazioException();
    }
    if (!validarEmail(dados.email)) {
      throw new EmailInvalidoException();
    }

    return super.criar(dados);
  }

  public async excluir(id: number): Promise<void> {
    const cliente = await this.buscarPorId(id);
    if (!cliente) {
      throw new ClienteNaoEncontradoException();
    }
    await super.excluir(id);
  }
}

export default ClienteServico;
export { ClienteServico };
