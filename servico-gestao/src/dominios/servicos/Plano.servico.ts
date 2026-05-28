import { Injectable } from '@nestjs/common';
import ServicoBase from '@gestao-internet/comuns/ServicoBase';

import PlanoEntidade from 'src/adaptadores/persistencia/entidades/Plano.entidade';
import PlanoModelo from '../modelos/Plano.modelo';
import PlanoRepositorio from 'src/adaptadores/persistencia/repositorios/Plano.repositorio';

import {
  CustoMensalNegativoException,
  CustoMensalVazioException,
  NomeVazioException,
  PlanoNaoEncontradoException,
  NomeDuplicadoException,
} from '../excecoes/plano';

import normalizarEspacos from 'src/comuns/utils/normalizarEspacos';

@Injectable()
class PlanoServico extends ServicoBase<PlanoEntidade, PlanoModelo> {
  public constructor(repo: PlanoRepositorio) {
    super(repo, PlanoModelo.criar);
  }

  public async buscarPorNome(nome: string): Promise<PlanoModelo | null> {
    nome = normalizarEspacos(nome);
    
    this.onde('nome', '=', nome);
    
    const [plano = null] = await this.buscar();
    return plano;
  }

  public async criar(
    dados: Omit<PlanoEntidade, 'codigo'>
  ): Promise<PlanoModelo> {
    dados.nome = normalizarEspacos(dados.nome);
    if (!dados.nome) {
      throw new NomeVazioException();
    }

    const planoComMesmoNome = await this.buscarPorNome(dados.nome);
    if (planoComMesmoNome) {
      throw new NomeDuplicadoException();
    }

    if (!dados.custoMensal) {
      throw new CustoMensalVazioException();
    }
    if (dados.custoMensal <= 0) {
      throw new CustoMensalNegativoException();
    }

    return super.criar(dados);
  }

  public async atualizar(
    id: number,
    dados: Partial<PlanoEntidade>
  ): Promise<PlanoModelo> {
    const plano = await this.buscarPorId(id);
    if (!plano) {
      throw new PlanoNaoEncontradoException();
    }
    if (typeof dados.nome === 'string') {
      dados.nome = normalizarEspacos(dados.nome);
      if (!dados.nome) {
        throw new NomeVazioException();
      }

      const planoComMesmoNome = await this.buscarPorNome(dados.nome);
      if (planoComMesmoNome && planoComMesmoNome.codigo !== id) {
        throw new NomeDuplicadoException();
      }
    }

    if (typeof dados.custoMensal === 'number') {
      if (dados.custoMensal <= 0) {
        throw new CustoMensalNegativoException();
      }
    }

    return super.atualizar(id, dados);
  }

  public async excluir(id: number): Promise<void> {
    const plano = await this.buscarPorId(id);
    if (!plano) {
      throw new PlanoNaoEncontradoException();
    }

    return super.excluir(id);
  }
}

export default PlanoServico;
export { PlanoServico };
