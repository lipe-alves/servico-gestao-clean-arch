import { Injectable } from '@nestjs/common';
import ICasoUso from 'src/aplicacao/interfaces/CasoUso.interface';
import ClienteServico from 'src/dominios/servicos/Cliente.servico';
import ClienteModelo from 'src/dominios/modelos/Cliente.modelo';
import { CadastrarClienteDto } from 'src/aplicacao/dtos/clientes/CadastrarCliente.dto';
import validarEmail from 'src/comuns/utils/validarEmail';

@Injectable()
class CadastrarClienteCasoUso implements ICasoUso {
  private readonly clienteServico: ClienteServico;

  public constructor(clienteServico: ClienteServico) {
    this.clienteServico = clienteServico;
  }

  public async executar(input: CadastrarClienteDto): Promise<ClienteModelo> {
    const cliente = await this.clienteServico.criar({
      nome: input.nome,
      email: input.email,
    });
    return cliente;
  }
}

export default CadastrarClienteCasoUso;
export { CadastrarClienteCasoUso };
