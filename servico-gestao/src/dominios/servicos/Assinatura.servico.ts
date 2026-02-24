import { Injectable } from "@nestjs/common";
import ServicoBase from "src/comuns/ServicoBase";

import AssinaturaEntidade, {
  AssinaturaStatus,
} from "src/adaptadores/persistencia/entidades/Assinatura.entidade";
import AssinaturaModelo from "../modelos/Assinatura.modelo";
import AssinaturaRepositorio from "src/adaptadores/persistencia/repositorios/Assinatura.repositorio";

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
      this.onde("status", "=", params.status);
    }

    if (params.codPlano) {
      this.onde("codPlano", "=", params.codPlano);
    }

    if (params.codCliente) {
      this.onde("codCliente", "=", params.codCliente);
    }

    return super.buscar();
  }

  public async atualizar(
    id: number,
    dados: Partial<AssinaturaEntidade>,
  ): Promise<AssinaturaModelo> {
    if (typeof dados.custoFinal === "number") {
      if (dados.custoFinal <= 0)
        throw new Error("O custo final não pode ser igual ou menos que zero!");
    }

    return super.atualizar(id, dados);
  }

  public async criar(
    dados: Omit<AssinaturaEntidade, "codigo" | "dataUltimoPagamento">,
  ): Promise<AssinaturaModelo> {
    if (dados.custoFinal <= 0)
      throw new Error("O custo final não pode ser igual ou menos que zero!");

    return super.criar({
      ...dados,
      dataUltimoPagamento: null,
    });
  }
}

export default AssinaturaServico;
export { AssinaturaServico };
