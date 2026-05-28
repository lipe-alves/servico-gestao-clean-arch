import { Injectable } from '@nestjs/common';

import ICasoUso from 'src/aplicacao/interfaces/CasoUso.interface';
import PlanoServico from 'src/dominios/servicos/Plano.servico';
import PlanoModelo from 'src/dominios/modelos/Plano.modelo';
import { BuscarPlanosDto } from 'src/aplicacao/dtos/planos/BuscarPlanos.dto';
import { PlanoNaoEncontradoException } from 'src/dominios/excecoes/plano';

@Injectable()
class BuscarPlanosCasoUso implements ICasoUso {
  private readonly planoServico: PlanoServico;

  public constructor(planoServico: PlanoServico) {
    this.planoServico = planoServico;
  }

  public async executar(params: BuscarPlanosDto = {}): Promise<PlanoModelo[]> {
    if (!params.codigo) {
      const planos = await this.planoServico.buscar(); // Busca todos
      return planos;
    } else {
      const plano = await this.planoServico.buscarPorId(params.codigo);
      if (!plano) throw new PlanoNaoEncontradoException();
      return [plano];
    }
  }
}

export default BuscarPlanosCasoUso;
export { BuscarPlanosCasoUso };
