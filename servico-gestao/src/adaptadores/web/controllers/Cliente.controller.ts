import { Controller, UsePipes } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MENSAGENS } from '@gestao-internet/comuns/constantes';

import BuscarClienteCasoUso from 'src/aplicacao/casos-uso/clientes/BuscarClientes.casoUso';
import {
  BuscarClientesDto,
  BuscarClientesDtoSchema,
} from 'src/aplicacao/dtos/clientes/BuscarClientes.dto';

import CadastrarClienteCasoUso from 'src/aplicacao/casos-uso/clientes/CadastrarCliente.casoUso';
import {
  CadastrarClienteDto,
  CadastrarClienteDtoSchema,
} from 'src/aplicacao/dtos/clientes/CadastrarCliente.dto';

import AtualizarClienteCasoUso from 'src/aplicacao/casos-uso/clientes/AtualizarCliente.casoUso';
import {
  AtualizarClienteDto,
  AtualizarClienteDtoSchema,
} from 'src/aplicacao/dtos/clientes/AtualizarCliente.dto';

import ExcluirClienteCasoUso from 'src/aplicacao/casos-uso/clientes/ExcluirCliente.casoUso';

import ValidatorPipe from 'src/adaptadores/web/pipes/Validator.pipe';

@Controller()
class ClienteController {
  private readonly buscarClientesCasoUso: BuscarClienteCasoUso;
  private readonly cadastrarClienteCasoUso: CadastrarClienteCasoUso;
  private readonly excluirClienteCasoUso: ExcluirClienteCasoUso;
  private readonly atualizarClienteCasoUso: AtualizarClienteCasoUso;

  public constructor(
    buscarClientesCasoUso: BuscarClienteCasoUso,
    cadastrarClienteCasoUso: CadastrarClienteCasoUso,
    excluirClienteCasoUso: ExcluirClienteCasoUso,
    atualizarClienteCasoUso: AtualizarClienteCasoUso
  ) {
    this.buscarClientesCasoUso = buscarClientesCasoUso;
    this.cadastrarClienteCasoUso = cadastrarClienteCasoUso;
    this.excluirClienteCasoUso = excluirClienteCasoUso;
    this.atualizarClienteCasoUso = atualizarClienteCasoUso;
  }

  @MessagePattern(MENSAGENS.BUSCAR_CLIENTES)
  @UsePipes(new ValidatorPipe(BuscarClientesDtoSchema))
  public async buscarClientes(@Payload() params: BuscarClientesDto = {}) {
    const clientes = await this.buscarClientesCasoUso.executar(params);
    return clientes.map((cliente) => cliente.paraJson());
  }

  @MessagePattern(MENSAGENS.CADASTRAR_CLIENTE)
  @UsePipes(new ValidatorPipe(CadastrarClienteDtoSchema))
  public async cadastrarCliente(@Payload() dados: CadastrarClienteDto) {
    const cliente = await this.cadastrarClienteCasoUso.executar(dados);
    return cliente.paraJson();
  }

  @MessagePattern(MENSAGENS.ATUALIZAR_CLIENTE)
  @UsePipes(new ValidatorPipe(AtualizarClienteDtoSchema))
  public async atualizarCliente(@Payload() dados: AtualizarClienteDto) {
    const cliente = await this.atualizarClienteCasoUso.executar(dados);
    return cliente.paraJson();
  }

  @MessagePattern(MENSAGENS.EXCLUIR_CLIENTE)
  public async excluirCliente(@Payload() id: number) {
    await this.excluirClienteCasoUso.executar(id);
    return {
      sucesso: true,
      mensagem: 'Cliente excluído com sucesso',
    };
  }
}

export default ClienteController;
export { ClienteController };
