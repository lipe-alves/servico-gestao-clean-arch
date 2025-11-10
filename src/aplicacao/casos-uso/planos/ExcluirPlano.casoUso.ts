import { Injectable } from '@nestjs/common';
import ICasoUso from 'src/aplicacao/interfaces/CasoUso.interface';
import PlanoServico from 'src/dominios/servicos/Plano.servico';

@Injectable()
class ExcluirPlanoCasoUso implements ICasoUso {
  private readonly planoServico: PlanoServico;

  public constructor(planoServico: PlanoServico) {
    this.planoServico = planoServico;
  }

  public async executar(id: number): Promise<void> {
    await this.planoServico.excluir(id);
  }
}

export default ExcluirPlanoCasoUso;
export { ExcluirPlanoCasoUso };
