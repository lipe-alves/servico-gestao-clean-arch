import { Injectable } from '@nestjs/common';
import ICasoUso from 'src/aplicacao/interfaces/CasoUso.interface';

import AssinaturaServico from 'src/dominios/servicos/Assinatura.servico';
import ClienteServico from 'src/dominios/servicos/Cliente.servico';
import PlanoServico from 'src/dominios/servicos/Plano.servico';

import AssinaturaModelo from 'src/dominios/modelos/Assinatura.modelo';
import { BuscarAssinaturasDto } from 'src/aplicacao/dtos/assinaturas/BuscarAssinaturas.dto';

@Injectable()
class BuscarAssinaturasCasoUso implements ICasoUso {
  private readonly assinaturaServico: AssinaturaServico;
  private readonly clienteServico: ClienteServico;
  private readonly planoServico: PlanoServico;

  public constructor(
    assinaturaServico: AssinaturaServico,
    clienteServico: ClienteServico,
    planoServico: PlanoServico
  ) {
    this.assinaturaServico = assinaturaServico;
    this.clienteServico = clienteServico;
    this.planoServico = planoServico;
  }

  public async executar(params: BuscarAssinaturasDto = {}): Promise<AssinaturaModelo[]> {
    if (!params.codigo) {
      if (params.codCliente) {
        const cliente = await this.clienteServico.buscarPorId(params.codCliente);
        if (!cliente) throw new Error("Cliente não encontrado!");
      }

      if (params.codPlano) {
        const plano = await this.planoServico.buscarPorId(params.codPlano);
        if (!plano) throw new Error("Plano não encontrado!");
      }

      const assinaturas = await this.assinaturaServico.buscar(params);
      return assinaturas;
    } else {
      const assinatura = await this.assinaturaServico.buscarPorId(params.codigo);
      return [assinatura];
    }
  }
}

export default BuscarAssinaturasCasoUso;
export { BuscarAssinaturasCasoUso };
