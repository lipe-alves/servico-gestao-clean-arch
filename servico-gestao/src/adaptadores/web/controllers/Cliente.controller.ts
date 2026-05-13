import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Param,
  Patch,
  UsePipes,
  ParseIntPipe,
} from '@nestjs/common';
import ControllerBase from 'src/adaptadores/web/base/ControllerBase';

import BuscarClienteCasoUso from 'src/aplicacao/casos-uso/clientes/BuscarClientes.casoUso';
import CadastrarClienteCasoUso from 'src/aplicacao/casos-uso/clientes/CadastrarCliente.casoUso';
import {
  CadastrarClienteDto,
  CadastrarClienteDtoSchema,
} from 'src/aplicacao/dtos/clientes/CadastrarCliente.dto';
import ExcluirClienteCasoUso from 'src/aplicacao/casos-uso/clientes/ExcluirCliente.casoUso';
import AtualizarClienteCasoUso from 'src/aplicacao/casos-uso/clientes/AtualizarCliente.casoUso';
import {
  AtualizarClienteDto,
  AtualizarClienteDtoSchema,
} from 'src/aplicacao/dtos/clientes/AtualizarCliente.dto';

import ValidatorPipe from 'src/adaptadores/web/pipes/Validator.pipe';

@Controller('/gestao/clientes')
class ClienteController extends ControllerBase {
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
    super();
    this.buscarClientesCasoUso = buscarClientesCasoUso;
    this.cadastrarClienteCasoUso = cadastrarClienteCasoUso;
    this.excluirClienteCasoUso = excluirClienteCasoUso;
    this.atualizarClienteCasoUso = atualizarClienteCasoUso;
  }

  @Get()
  public async getClientes() {
    const clientes = await this.buscarClientesCasoUso.executar(); // Busca todos
    return this.sucesso(
      'Consulta realizada com sucesso!',
      clientes.map((cliente) => cliente.paraJson())
    );
  }

  @Get('/:idCliente')
  public async getPlano(
    @Param('idCliente', ParseIntPipe)
    id: number
  ) {
    const [cliente] = await this.buscarClientesCasoUso.executar(id);
    return this.sucesso('Consulta realizada com sucesso!', cliente.paraJson());
  }

  @Post()
  @UsePipes(new ValidatorPipe(CadastrarClienteDtoSchema, 'body'))
  public async postCliente(@Body() dados: CadastrarClienteDto) {
    const cliente = await this.cadastrarClienteCasoUso.executar(dados);
    return this.sucesso('Cadastro efetuado com sucesso!', cliente.paraJson());
  }

  @Patch('/:idCliente')
  @UsePipes(new ValidatorPipe(AtualizarClienteDtoSchema, 'body'))
  public async patchCliente(
    @Param('idCliente', ParseIntPipe) id: number,
    @Body() dados: AtualizarClienteDto
  ) {
    const cliente = await this.atualizarClienteCasoUso.executar(id, dados);
    return this.sucesso('Atualizção efetuada com sucesso!', cliente.paraJson());
  }

  @Delete('/:idCliente')
  public async deleteCliente(
    @Param('idCliente', ParseIntPipe)
    id: number
  ) {
    await this.excluirClienteCasoUso.executar(id);
    return this.sucesso('Exclusão efetuada com sucesso!');
  }
}

export default ClienteController;
export { ClienteController };
