import { Injectable } from '@nestjs/common';
import ICasoUso from 'src/aplicacao/interfaces/CasoUso.interface';

import AssinaturaServico from 'src/dominios/servicos/Assinatura.servico';
import ClienteServico from 'src/dominios/servicos/Cliente.servico';
import PlanoServico from 'src/dominios/servicos/Plano.servico';
import { AssinaturaStatus } from 'src/adaptadores/persistencia/entidades/Assinatura.entidade';

import { CadastrarAssinaturaDto } from 'src/aplicacao/dtos/assinaturas/CadastrarAssinatura.dto';
import AssinaturaModelo from 'src/dominios/modelos/Assinatura.modelo';

import validarData from 'src/comuns/utils/validarData';

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

  public async executar(input: CadastrarAssinaturaDto): Promise<AssinaturaModelo> {
    const cliente = await this.clienteServico.buscarPorId(input.codCliente);
    if (!cliente) throw new Error("Cliente não encontrado!");

    const plano = await this.planoServico.buscarPorId(input.codPlano);
    if (!plano) throw new Error("Plano não encontrado!");

    if (!validarData(input.inicioFidelidade)) throw new Error("Data de início de fidelidade inválida!");
    if (!validarData(input.fimFidelidade)) throw new Error("Data de início de fidelidade inválida!");
    
    if (![AssinaturaStatus.ATIVO, AssinaturaStatus.CANCELADO].includes(input.status))
      throw new Error("Status inválido!");

    const assinatura = await this.assinaturaServico.criar({
      ...input,
      cliente,
      plano,
      inicioFidelidade: new Date(input.inicioFidelidade),
      fimFidelidade: new Date(input.fimFidelidade),
    });

    return assinatura;
  }
}

export default CadastrarAssinaturaCasoUso;
export { CadastrarAssinaturaCasoUso };
