import { Injectable } from '@nestjs/common';
import ServicoBase from 'src/dominios/base/ServicoBase';

import AssinaturaEntidade, {
  AssinaturaStatus,
} from 'src/adaptadores/persistencia/entidades/Assinatura.entidade';
import AssinaturaModelo from '../modelos/Assinatura.modelo';
import AssinaturaRepositorio from 'src/adaptadores/persistencia/repositorios/Assinatura.repositorio';
import {
  AssinaturaNaoEncontradaException,
  CustoFinalNegativoException,
} from '../excecoes/assinatura';

@Injectable()
class AssinaturaServico extends ServicoBase<
  AssinaturaEntidade,
  AssinaturaModelo
> {
  public constructor(repo: AssinaturaRepositorio) {
    super(repo, AssinaturaModelo.criar);
  }

  public async buscar(params?: {
    status?: AssinaturaStatus;
    codPlano?: number;
    codCliente?: number;
  }): Promise<AssinaturaModelo[]> {
    if (params.status && params.status !== AssinaturaStatus.TODOS) {
      this.onde('status', '=', params.status);
    }

    if (params.codPlano) {
      this.onde('codPlano', '=', params.codPlano);
    }

    if (params.codCliente) {
      this.onde('codCliente', '=', params.codCliente);
    }

    return super.buscar();
  }

  public async atualizar(
    id: number,
    dados: Partial<AssinaturaEntidade>
  ): Promise<AssinaturaModelo> {
    const assinatura = await this.buscarPorId(id);
    if (!assinatura) {
      throw new AssinaturaNaoEncontradaException();
    }

    if (typeof dados.custoFinal === 'number') {
      if (dados.custoFinal <= 0) throw new CustoFinalNegativoException();
    }

    return super.atualizar(id, dados);
  }

  public async criar(
    dados: Omit<AssinaturaEntidade, 'codigo' | 'dataUltimoPagamento'>
  ): Promise<AssinaturaModelo> {
    if (dados.custoFinal <= 0) throw new CustoFinalNegativoException();

    return super.criar({
      ...dados,
      dataUltimoPagamento: null,
    });
  }

  public async excluir(id: number): Promise<void> {
    const plano = await this.buscarPorId(id);
    if (!plano) {
      throw new AssinaturaNaoEncontradaException();
    }

    return super.excluir(id);
  }
}

export default AssinaturaServico;
export { AssinaturaServico };
