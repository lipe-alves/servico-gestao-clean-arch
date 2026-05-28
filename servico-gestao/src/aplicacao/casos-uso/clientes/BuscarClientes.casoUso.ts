import { Injectable } from '@nestjs/common';
import ICasoUso from 'src/aplicacao/interfaces/CasoUso.interface';
import ClienteServico from 'src/dominios/servicos/Cliente.servico';
import ClienteModelo from 'src/dominios/modelos/Cliente.modelo';
import { ClienteNaoEncontradoException } from 'src/dominios/excecoes/cliente';
import { BuscarClientesDto } from 'src/aplicacao/dtos/clientes/BuscarClientes.dto';

@Injectable()
class BuscarClientesCasoUso implements ICasoUso {
  private readonly clienteServico: ClienteServico;

  public constructor(clienteServico: ClienteServico) {
    this.clienteServico = clienteServico;
  }

  public async executar(
    params: BuscarClientesDto = {}
  ): Promise<ClienteModelo[]> {
    const { codigo } = params;
    if (!codigo) {
      const clientes = await this.clienteServico.buscar(); // Busca todos
      return clientes;
    } else {
      const cliente = await this.clienteServico.buscarPorId(codigo);
      if (!cliente) {
        throw new ClienteNaoEncontradoException();
      }
      return [cliente];
    }
  }
}

export default BuscarClientesCasoUso;
export { BuscarClientesCasoUso };
