import { Injectable } from "@nestjs/common";
import ICasoUso from "src/aplicacao/interfaces/CasoUso.interface";
import PlanoServico from "src/dominios/servicos/Plano.servico";
import PlanoModelo from "src/dominios/modelos/Plano.modelo";
import { AtualizarPlanoDto } from "src/aplicacao/dtos/planos/AtualizarPlano.dto";

@Injectable()
class AtualizarPlanoCasoUso implements ICasoUso {
  private readonly planoServico: PlanoServico;

  public constructor(planoServico: PlanoServico) {
    this.planoServico = planoServico;
  }

  public async executar(
    id: number,
    input: AtualizarPlanoDto,
  ): Promise<PlanoModelo> {
    const planoEncontrado = await this.planoServico.buscarPorId(id);
    if (!planoEncontrado) throw new Error("Plano não encontrado");

    const plano = await this.planoServico.atualizar(id, {
      ...input,
      data: new Date(),
    });
    return plano;
  }
}

export default AtualizarPlanoCasoUso;
export { AtualizarPlanoCasoUso };
