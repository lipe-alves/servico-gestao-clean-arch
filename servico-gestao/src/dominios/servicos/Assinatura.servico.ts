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

type CriarAssinaturaDto = Omit<
  AssinaturaEntidade,
  'codigo' | 'inicioFidelidade' | 'fimFidelidade' | 'dataUltimoPagamento'
>;

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
    if (params.codPlano) {
      this.onde('codPlano', '=', params.codPlano);
    }

    if (params.codCliente) {
      this.onde('codCliente', '=', params.codCliente);
    }

    let assinaturas = await super.buscar();

    if (params.status) {
      assinaturas = assinaturas.filter(
        (assinatura) => assinatura.status === params.status
      );
    }

    return assinaturas;
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

    if (dados.inicioFidelidade) {
      const inicioFidelidadeData = new Date(dados.inicioFidelidade);
      const fimFidelidadeData = new Date(inicioFidelidadeData.getTime());
      fimFidelidadeData.setFullYear(fimFidelidadeData.getFullYear() + 1);

      const [inicioFidelidade] = inicioFidelidadeData.toISOString().split('T');
      const [fimFidelidade] = fimFidelidadeData.toISOString().split('T');

      dados.inicioFidelidade = inicioFidelidade;
      dados.fimFidelidade = fimFidelidade;
    }

    const statusAntes = assinatura.status;
    const assinaturaAtualizada = await super.atualizar(id, dados);
    const statusAtual = assinaturaAtualizada.status;

    if (statusAtual !== statusAntes) {
      if (statusAtual === AssinaturaStatus.Ativo) {
        await lastValueFrom(
          this.filaAssinaturasAtivas.emit(
            EVENTOS.ASSINATURA_ATIVA,
            assinaturaAtualizada.paraJson()
          )
        );
      } else if (statusAtual === AssinaturaStatus.Cancelado) {
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

  public async criar(dados: CriarAssinaturaDto): Promise<AssinaturaModelo> {
    if (dados.custoFinal <= 0) {
      throw new CustoFinalNegativoException();
    }

    const inicioFidelidadeData = new Date();
    const fimFidelidadeData = new Date(inicioFidelidadeData.getTime());
    fimFidelidadeData.setFullYear(fimFidelidadeData.getFullYear() + 1);

    const [inicioFidelidade] = inicioFidelidadeData.toISOString().split('T');
    const [fimFidelidade] = fimFidelidadeData.toISOString().split('T');

    const assinatura = await super.criar({
      ...dados,
      inicioFidelidade,
      fimFidelidade,
      dataUltimoPagamento: inicioFidelidade,
    });

    if (assinatura.status === AssinaturaStatus.Ativo) {
      await lastValueFrom(
        this.filaAssinaturasAtivas.emit(
          EVENTOS.ASSINATURA_ATIVA,
          assinatura.paraJson()
        )
      );
    } else if (assinatura.status === AssinaturaStatus.Cancelado) {
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
