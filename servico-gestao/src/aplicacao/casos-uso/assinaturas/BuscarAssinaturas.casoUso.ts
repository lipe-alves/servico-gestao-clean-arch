import { Injectable } from '@nestjs/common';
import ICasoUso from 'src/aplicacao/interfaces/CasoUso.interface';

import AssinaturaServico from 'src/dominios/servicos/Assinatura.servico';
import ClienteServico from 'src/dominios/servicos/Cliente.servico';
import PlanoServico from 'src/dominios/servicos/Plano.servico';

import AssinaturaModelo from 'src/dominios/modelos/Assinatura.modelo';
import { BuscarAssinaturasDto } from 'src/aplicacao/dtos/assinaturas/BuscarAssinaturas.dto';
import { ClienteNaoEncontradoException } from 'src/dominios/excecoes/cliente';
import { PlanoNaoEncontradoException } from 'src/dominios/excecoes/plano';
import { AssinaturaNaoEncontradaException } from 'src/dominios/excecoes/assinatura';

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

  public async executar(
    params: BuscarAssinaturasDto = {}
  ): Promise<AssinaturaModelo[]> {
    if (!params.codigo) {
      if (params.codCliente) {
        const cliente = await this.clienteServico.buscarPorId(
          params.codCliente
        );
        if (!cliente) throw new ClienteNaoEncontradoException();
      }

      if (params.codPlano) {
        const plano = await this.planoServico.buscarPorId(params.codPlano);
        if (!plano) throw new PlanoNaoEncontradoException();
      }

      const assinaturas = await this.assinaturaServico.buscar({
        ...params,
        status: params.status === 'Todos' ? undefined : params.status,
      });
      return assinaturas;
    } else {
      const assinatura = await this.assinaturaServico.buscarPorId(
        params.codigo
      );
      if (!assinatura) {
        throw new AssinaturaNaoEncontradaException();
      }
      return [assinatura];
    }
  }
}

export default BuscarAssinaturasCasoUso;
export { BuscarAssinaturasCasoUso };
