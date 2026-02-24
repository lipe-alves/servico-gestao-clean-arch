import { Injectable } from '@nestjs/common';
import ICasoUso from 'src/aplicacao/interfaces/CasoUso.interface';
import ClienteServico from 'src/dominios/servicos/Cliente.servico';
import ClienteModelo from 'src/dominios/modelos/Cliente.modelo';

@Injectable()
class BuscarClientesCasoUso implements ICasoUso {
  private readonly clienteServico: ClienteServico;

  public constructor(clienteServico: ClienteServico) {
    this.clienteServico = clienteServico;
  }

  public async executar(id?: number): Promise<ClienteModelo[]> {
    if (!id) {
      const clientes = await this.clienteServico.buscar(); // Busca todos
      return clientes;
    } else {
      const cliente = await this.clienteServico.buscarPorId(id);
      return [cliente];
    }
  }
}

export default BuscarClientesCasoUso;
export { BuscarClientesCasoUso };
