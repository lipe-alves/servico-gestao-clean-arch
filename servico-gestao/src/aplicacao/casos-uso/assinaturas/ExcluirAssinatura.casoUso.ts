import { Injectable } from '@nestjs/common';
import ICasoUso from 'src/aplicacao/interfaces/CasoUso.interface';
import ClienteServico from 'src/dominios/servicos/Cliente.servico';

@Injectable()
class ExcluirClienteCasoUso implements ICasoUso {
  private readonly clienteServico: ClienteServico;

  public constructor(clienteServico: ClienteServico) {
    this.clienteServico = clienteServico;
  }

  public async executar(id: number): Promise<void> {
    await this.clienteServico.excluir(id);
  }
}

export default ExcluirClienteCasoUso;
export { ExcluirClienteCasoUso };
