import { Injectable } from '@nestjs/common';
import ICasoUso from 'src/aplicacao/interfaces/CasoUso.interface';
import ClienteServico from 'src/dominios/servicos/Cliente.servico';
import ClienteModelo from 'src/dominios/modelos/Cliente.modelo';
import { AtualizarClienteDto } from 'src/aplicacao/dtos/clientes/AtualizarCliente.dto';
import validarEmail from 'src/comuns/utils/validarEmail';

@Injectable()
class AtualizarClienteCasoUso implements ICasoUso {
  private readonly clienteServico: ClienteServico;

  public constructor(clienteServico: ClienteServico) {
    this.clienteServico = clienteServico;
  }

  public async executar(id: number, input: AtualizarClienteDto): Promise<ClienteModelo> {
    const cliente = await this.clienteServico.atualizar(id, { ...input });
    return cliente;
  }
}

export default AtualizarClienteCasoUso;
export { AtualizarClienteCasoUso };
