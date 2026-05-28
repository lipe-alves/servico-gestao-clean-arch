import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Param,
  Patch,
  Dependencies,
  ParseIntPipe,
  UsePipes,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { FILAS, MENSAGENS } from '@gestao-internet/comuns/constantes';
import { lastValueFrom } from 'rxjs';

import ControllerBase from '../base/ControllerBase';

import {
  CadastrarPlanoDto,
  CadastrarPlanoDtoSchema,
} from '../dtos/planos/CadastrarPlano.dto';
import {
  AtualizarPlanoDto,
  AtualizarPlanoDtoSchema,
} from '../dtos/planos/AtualizarPlano.dto';

import ValidatorPipe from '../pipes/Validator.pipe';

@Controller('/gestao/planos')
@Dependencies(FILAS.GESTAO)
class PlanoController extends ControllerBase {
  private readonly filaGestao: ClientProxy;

  public constructor(filaGestao: ClientProxy) {
    super();
    this.filaGestao = filaGestao;
  }

  @Get()
  public async getPlanos() {
    const observavel = this.filaGestao.send(MENSAGENS.BUSCAR_PLANOS, {});
    const planos = await lastValueFrom(observavel);
    return this.sucesso('Consulta realizada com sucesso!', planos);
  }

  @Get('/:idPlano')
  public async getPlano(@Param('idPlano', ParseIntPipe) id: number) {
    const observavel = this.filaGestao.send(MENSAGENS.BUSCAR_PLANOS, {
      codigo: id,
    });
    const [plano] = await lastValueFrom(observavel);
    return this.sucesso('Consulta realizada com sucesso!', plano);
  }

  @Post()
  @UsePipes(new ValidatorPipe(CadastrarPlanoDtoSchema, 'body'))
  public async postPlano(@Body() dados: CadastrarPlanoDto) {
    const observavel = this.filaGestao.send(MENSAGENS.CADASTRAR_PLANO, dados);
    const plano = await lastValueFrom(observavel);
    return this.sucesso('Cadastro efetuado com sucesso!', plano);
  }

  @Patch('/:idPlano')
  @UsePipes(new ValidatorPipe(AtualizarPlanoDtoSchema, 'body'))
  public async patchPlano(
    @Param('idPlano', ParseIntPipe) id: number,
    @Body() dados: AtualizarPlanoDto
  ) {
    const observavel = this.filaGestao.send(MENSAGENS.ATUALIZAR_PLANO, {
      id,
      ...dados,
    });
    const plano = await lastValueFrom(observavel);
    return this.sucesso('Atualizção efetuada com sucesso!', plano);
  }

  @Delete('/:idPlano')
  public async deletePlano(@Param('idPlano', ParseIntPipe) id: number) {
    const observavel = this.filaGestao.send(MENSAGENS.EXCLUIR_PLANO, id);
    await lastValueFrom(observavel);
    return this.sucesso('Exclusão efetuada com sucesso!');
  }
}

export default PlanoController;
export { PlanoController };
