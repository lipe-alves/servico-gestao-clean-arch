import { Injectable } from '@nestjs/common';
import ICasoUso from 'src/aplicacao/interfaces/CasoUso.interface';
import PlanoServico from 'src/dominios/servicos/Plano.servico';
import PlanoModelo from 'src/dominios/modelos/Plano.modelo';

@Injectable()
class BuscarPlanosCasoUso implements ICasoUso {
  private readonly planoServico: PlanoServico;

  public constructor(planoServico: PlanoServico) {
    this.planoServico = planoServico;
  }

  public async executar(id?: number): Promise<PlanoModelo[]> {
    if (!id) {
      const planos = await this.planoServico.buscar(); // Busca todos
      return planos;
    } else {
      const plano = await this.planoServico.buscarPorId(id);
      return [plano];
    }
  }
}

export default BuscarPlanosCasoUso;
export { BuscarPlanosCasoUso };
