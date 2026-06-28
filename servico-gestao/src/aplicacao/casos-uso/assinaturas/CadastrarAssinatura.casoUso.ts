import { Injectable } from '@nestjs/common';
import ICasoUso from 'src/aplicacao/interfaces/CasoUso.interface';

import AssinaturaServico from 'src/dominios/servicos/Assinatura.servico';
import ClienteServico from 'src/dominios/servicos/Cliente.servico';
import PlanoServico from 'src/dominios/servicos/Plano.servico';

import { CadastrarAssinaturaDto } from 'src/aplicacao/dtos/assinaturas/CadastrarAssinatura.dto';
import AssinaturaModelo from 'src/dominios/modelos/Assinatura.modelo';

import { ClienteNaoEncontradoException } from 'src/dominios/excecoes/cliente';
import { PlanoNaoEncontradoException } from 'src/dominios/excecoes/plano';

@Injectable()
class CadastrarAssinaturaCasoUso implements ICasoUso {
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
    input: CadastrarAssinaturaDto
  ): Promise<AssinaturaModelo> {
    const cliente = await this.clienteServico.buscarPorId(input.codCliente);
    if (!cliente) throw new ClienteNaoEncontradoException();

    const plano = await this.planoServico.buscarPorId(input.codPlano);
    if (!plano) throw new PlanoNaoEncontradoException();

    const assinatura = await this.assinaturaServico.criar({
      ...input,
      cliente,
      plano,
    });

    return assinatura;
  }
}

export default CadastrarAssinaturaCasoUso;
export { CadastrarAssinaturaCasoUso };
