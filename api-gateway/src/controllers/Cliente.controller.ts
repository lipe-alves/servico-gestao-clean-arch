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
  Dependencies,
} from '@nestjs/common';
import { FILAS, MENSAGENS } from '@gestao-internet/comuns/constantes';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

import ControllerBase from '../base/ControllerBase';

import {
  CadastrarClienteDto,
  CadastrarClienteDtoSchema,
} from '../dtos/clientes/CadastrarCliente.dto';
import {
  AtualizarClienteDto,
  AtualizarClienteDtoSchema,
} from '../dtos/clientes/AtualizarCliente.dto';

import ValidatorPipe from '../pipes/Validator.pipe';

@Controller('/gestao/clientes')
@Dependencies(FILAS.GESTAO)
class ClienteController extends ControllerBase {
  private readonly filaGestao: ClientProxy;

  public constructor(filaGestao: ClientProxy) {
    super();
    this.filaGestao = filaGestao;
  }

  @Get()
  public async getClientes() {
    const observavl = this.filaGestao.send(MENSAGENS.BUSCAR_CLIENTES, {});
    const clientes = await lastValueFrom(observavl);
    return this.sucesso('Consulta realizada com sucesso!', clientes);
  }

  @Get('/:idCliente')
  public async getCliente(
    @Param('idCliente', ParseIntPipe)
    id: number
  ) {
    const observavl = this.filaGestao.send(MENSAGENS.BUSCAR_CLIENTES, {
      codigo: id,
    });
    const [cliente] = await lastValueFrom(observavl);
    return this.sucesso('Consulta realizada com sucesso!', cliente);
  }

  @Post()
  @UsePipes(new ValidatorPipe(CadastrarClienteDtoSchema, 'body'))
  public async postCliente(@Body() dados: CadastrarClienteDto) {
    const observavl = this.filaGestao.send(MENSAGENS.CADASTRAR_CLIENTE, dados);
    const cliente = await lastValueFrom(observavl);
    return this.sucesso('Cadastro efetuado com sucesso!', cliente);
  }

  @Patch('/:idCliente')
  @UsePipes(new ValidatorPipe(AtualizarClienteDtoSchema, 'body'))
  public async patchCliente(
    @Param('idCliente', ParseIntPipe) id: number,
    @Body() dados: AtualizarClienteDto
  ) {
    const observavl = this.filaGestao.send(MENSAGENS.ATUALIZAR_CLIENTE, {
      id,
      ...dados,
    });
    const cliente = await lastValueFrom(observavl);
    return this.sucesso('Atualizção efetuada com sucesso!', cliente);
  }

  @Delete('/:idCliente')
  public async deleteCliente(
    @Param('idCliente', ParseIntPipe)
    id: number
  ) {
    const observavl = this.filaGestao.send(MENSAGENS.EXCLUIR_CLIENTE, id);
    await lastValueFrom(observavl);
    return this.sucesso('Exclusão efetuada com sucesso!');
  }
}

export default ClienteController;
export { ClienteController };
