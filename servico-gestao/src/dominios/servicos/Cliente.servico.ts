import { Injectable } from '@nestjs/common';
import ServicoBase from '@gestao-internet/comuns/ServicoBase';

import ClienteEntidade from 'src/adaptadores/persistencia/entidades/Cliente.entidade';
import ClienteModelo from 'src/dominios/modelos/Cliente.modelo';
import ClienteRepositorio from 'src/adaptadores/persistencia/repositorios/Cliente.repositorio';

import validarEmail from 'src/comuns/utils/validarEmail';
import normalizarEspacos from 'src/comuns/utils/normalizarEspacos';

import {
  EmailInvalidoException,
  EmailVazioException,
  EmailDuplicadoException,
  NomeVazioException,
  NomeDuplicadoException,
  ClienteNaoEncontradoException,
} from 'src/dominios/excecoes/cliente';

@Injectable()
class ClienteServico extends ServicoBase<ClienteEntidade, ClienteModelo> {
  public constructor(repo: ClienteRepositorio) {
    super(repo, ClienteModelo.criar);
  }

  public async buscarPorNome(nome: string): Promise<ClienteModelo | null> {
    nome = normalizarEspacos(nome);
    this.onde('nome', '=', nome);
    const [cliente = null] = await this.buscar();
    return cliente;
  }

  public async buscarPorEmail(email: string): Promise<ClienteModelo | null> {
    this.onde('email', '=', email);
    const [cliente = null] = await this.buscar();
    return cliente;
  }

  public async atualizar(
    id: number,
    dados: Partial<ClienteEntidade>
  ): Promise<ClienteModelo> {
    const cliente = await this.buscarPorId(id);
    if (!cliente) {
      throw new ClienteNaoEncontradoException();
    }
    if (typeof dados.nome === 'string') {
      dados.nome = normalizarEspacos(dados.nome);
      if (!dados.nome) {
        throw new NomeVazioException();
      }

      const clienteComMesmoNome = await this.buscarPorNome(dados.nome);
      if (clienteComMesmoNome && clienteComMesmoNome.codigo !== id) {
        throw new NomeDuplicadoException();
      }
    }
    if (typeof dados.email === 'string') {
      if (!validarEmail(dados.email)) {
        throw new EmailInvalidoException();
      }

      const clienteComMesmoEmail = await this.buscarPorEmail(dados.email);
      if (clienteComMesmoEmail && clienteComMesmoEmail.codigo !== id) {
        throw new EmailDuplicadoException();
      }
    }

    return super.atualizar(id, dados);
  }

  public async criar(
    dados: Omit<ClienteEntidade, 'codigo'>
  ): Promise<ClienteModelo> {
    dados.nome = normalizarEspacos(dados.nome);
    if (!dados.nome) {
      throw new NomeVazioException();
    }

    const clienteComMesmoNome = await this.buscarPorNome(dados.nome);
    if (clienteComMesmoNome) {
      throw new NomeDuplicadoException();
    }

    if (!dados.email) {
      throw new EmailVazioException();
    }
    if (!validarEmail(dados.email)) {
      throw new EmailInvalidoException();
    }

    const clienteComMesmoEmail = await this.buscarPorEmail(dados.email);
    if (clienteComMesmoEmail) {
      throw new EmailDuplicadoException();
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
