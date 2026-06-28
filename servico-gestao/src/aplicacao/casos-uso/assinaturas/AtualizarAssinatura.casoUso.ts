import { Injectable } from '@nestjs/common';
import ICasoUso from 'src/aplicacao/interfaces/CasoUso.interface';

import AssinaturaServico from 'src/dominios/servicos/Assinatura.servico';
import ClienteServico from 'src/dominios/servicos/Cliente.servico';
import PlanoServico from 'src/dominios/servicos/Plano.servico';

import AssinaturaModelo from 'src/dominios/modelos/Assinatura.modelo';
import { AtualizarAssinaturaDto } from 'src/aplicacao/dtos/assinaturas/AtualizarAssinatura.dto';

import { ClienteNaoEncontradoException } from 'src/dominios/excecoes/cliente';
import { PlanoNaoEncontradoException } from 'src/dominios/excecoes/plano';

@Injectable()
class AtualizarAssinaturaCasoUso implements ICasoUso {
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

  public async executar({
    id,
    ...input
  }: AtualizarAssinaturaDto): Promise<AssinaturaModelo> {
    if (typeof input.codCliente !== 'undefined') {
      const cliente = await this.clienteServico.buscarPorId(input.codCliente);
      if (!cliente) throw new ClienteNaoEncontradoException();
    }

    if (typeof input.codPlano !== 'undefined') {
      const plano = await this.planoServico.buscarPorId(input.codPlano);
      if (!plano) throw new PlanoNaoEncontradoException();
    }

    let inicioFidelidade: string | undefined = undefined;
    if (input.inicioFidelidade) {
      const inicioFidelidadeData = new Date(input.inicioFidelidade);
      [inicioFidelidade] = inicioFidelidadeData.toISOString().split('T');
    }

    const assinatura = await this.assinaturaServico.atualizar(id, {
      ...input,
      inicioFidelidade,
    });

    return assinatura;
  }
}

export default AtualizarAssinaturaCasoUso;
export { AtualizarAssinaturaCasoUso };
