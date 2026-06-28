import { Injectable } from '@nestjs/common';
import ICasoUso from 'src/aplicacao/interfaces/CasoUso.interface';
import PlanoServico from 'src/dominios/servicos/Plano.servico';
import PlanoModelo from 'src/dominios/modelos/Plano.modelo';
import { AtualizarPlanoDto } from 'src/aplicacao/dtos/planos/AtualizarPlano.dto';
import { PlanoNaoEncontradoException } from 'src/dominios/excecoes/plano';

@Injectable()
class AtualizarPlanoCasoUso implements ICasoUso {
  private readonly planoServico: PlanoServico;

  public constructor(planoServico: PlanoServico) {
    this.planoServico = planoServico;
  }

  public async executar({
    id,
    ...atualizacoes
  }: AtualizarPlanoDto): Promise<PlanoModelo> {
    const [data] = new Date().toISOString().split('T');
    const plano = await this.planoServico.atualizar(id, {
      ...atualizacoes,
      data,
    });
    return plano;
  }
}

export default AtualizarPlanoCasoUso;
export { AtualizarPlanoCasoUso };
