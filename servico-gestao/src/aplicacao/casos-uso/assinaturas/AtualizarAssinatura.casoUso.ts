import { Injectable } from '@nestjs/common';
import ICasoUso from 'src/aplicacao/interfaces/CasoUso.interface';

import AssinaturaServico from 'src/dominios/servicos/Assinatura.servico';
import ClienteServico from 'src/dominios/servicos/Cliente.servico';
import PlanoServico from 'src/dominios/servicos/Plano.servico';

import AssinaturaModelo from 'src/dominios/modelos/Assinatura.modelo';
import { AtualizarAssinaturaDto } from 'src/aplicacao/dtos/assinaturas/AtualizarAssinatura.dto';

import validarData from 'src/comuns/utils/validarData';

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

  public async executar(id: number, input: AtualizarAssinaturaDto): Promise<AssinaturaModelo> {
    if (typeof input.codCliente !== "undefined") {
      const cliente = await this.clienteServico.buscarPorId(input.codCliente);
      if (!cliente) throw new Error("Cliente não encontrado!");
    }

    if (typeof input.codPlano !== "undefined") {
      const plano = await this.planoServico.buscarPorId(input.codPlano);
      if (!plano) throw new Error("Plano não encontrado!");
    }

    if (typeof input.inicioFidelidade === "string" && !validarData(input.inicioFidelidade)) 
      throw new Error("Data de início de fidelidade inválida!");
    if (typeof input.fimFidelidade === "string" && !input.fimFidelidade) 
      throw new Error("Data de fim de fidelidade inválida!");

    const assinatura = await this.assinaturaServico.atualizar(id, {
      ...input,
      inicioFidelidade: input.inicioFidelidade ? new Date(input.inicioFidelidade) : undefined,
      fimFidelidade: input.fimFidelidade ? new Date(input.fimFidelidade) : undefined,
    });

    return assinatura;
  }
}

export default AtualizarAssinaturaCasoUso;
export { AtualizarAssinaturaCasoUso };
