import { Dependencies, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { EVENTOS, FILAS } from '@gestao-internet/comuns/constantes';
import ServicoBase from '@gestao-internet/comuns/ServicoBase';

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
@Dependencies(AssinaturaRepositorio, FILAS.ASSINATURAS_ATIVAS)
class AssinaturaServico extends ServicoBase<
  AssinaturaEntidade,
  AssinaturaModelo
> {
  private readonly filaAssinaturasAtivas: ClientProxy;

  public constructor(
    repo: AssinaturaRepositorio,
    filaAssinaturasAtivas: ClientProxy
  ) {
    super(repo, AssinaturaModelo.criar);
    this.filaAssinaturasAtivas = filaAssinaturasAtivas;
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
      if (dados.custoFinal <= 0) {
        throw new CustoFinalNegativoException();
      }
    }

    const assinaturaAtualizada = await super.atualizar(id, dados);

    if (dados.status && dados.status !== assinatura.status) {
      if (dados.status === AssinaturaStatus.ATIVO) {
        await lastValueFrom(
          this.filaAssinaturasAtivas.emit(
            EVENTOS.ASSINATURA_ATIVA,
            assinaturaAtualizada.paraJson()
          )
        );
      } else if (dados.status === AssinaturaStatus.CANCELADO) {
        await lastValueFrom(
          this.filaAssinaturasAtivas.emit(
            EVENTOS.ASSINATURA_CANCELADA,
            assinaturaAtualizada.paraJson()
          )
        );
      }
    }

    await lastValueFrom(
      this.filaAssinaturasAtivas.emit(
        EVENTOS.ASSINATURA_ATUALIZADA,
        assinatura.paraJson()
      )
    );

    return assinaturaAtualizada;
  }

  public async criar(
    dados: Omit<AssinaturaEntidade, 'codigo' | 'dataUltimoPagamento'>
  ): Promise<AssinaturaModelo> {
    if (dados.custoFinal <= 0) {
      throw new CustoFinalNegativoException();
    }

    const assinatura = await super.criar({
      ...dados,
      dataUltimoPagamento: null,
    });

    if (assinatura.status === AssinaturaStatus.ATIVO) {
      await lastValueFrom(
        this.filaAssinaturasAtivas.emit(
          EVENTOS.ASSINATURA_ATIVA,
          assinatura.paraJson()
        )
      );
    } else if (assinatura.status === AssinaturaStatus.CANCELADO) {
      await lastValueFrom(
        this.filaAssinaturasAtivas.emit(
          EVENTOS.ASSINATURA_CANCELADA,
          assinatura.paraJson()
        )
      );
    }

    await lastValueFrom(
      this.filaAssinaturasAtivas.emit(
        EVENTOS.ASSINATURA_CRIADA,
        assinatura.paraJson()
      )
    );

    return assinatura;
  }

  public async excluir(id: number): Promise<void> {
    const plano = await this.buscarPorId(id);
    if (!plano) {
      throw new AssinaturaNaoEncontradaException();
    }

    await lastValueFrom(
      this.filaAssinaturasAtivas.emit(EVENTOS.ASSINATURA_EXCLUIDA, id)
    );

    return super.excluir(id);
  }
}

export default AssinaturaServico;
export { AssinaturaServico };
