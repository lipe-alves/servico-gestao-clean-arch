import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Param,
  Patch,
  ParseIntPipe,
  UsePipes,
} from '@nestjs/common';

import ControllerBase from 'src/adaptadores/web/base/ControllerBase';

import BuscarAssinaturaCasoUso from 'src/aplicacao/casos-uso/assinaturas/BuscarAssinaturas.casoUso';
import CadastrarAssinaturaCasoUso from 'src/aplicacao/casos-uso/assinaturas/CadastrarAssinatura.casoUso';
import {
  CadastrarAssinaturaDto,
  CadastrarAssinaturaDtoSchema,
} from 'src/aplicacao/dtos/assinaturas/CadastrarAssinatura.dto';
import ExcluirAssinaturaCasoUso from 'src/aplicacao/casos-uso/assinaturas/ExcluirAssinatura.casoUso';
import AtualizarAssinaturaCasoUso from 'src/aplicacao/casos-uso/assinaturas/AtualizarAssinatura.casoUso';
import {
  AtualizarAssinaturaDto,
  AtualizarAssinaturaDtoSchema,
} from 'src/aplicacao/dtos/assinaturas/AtualizarAssinatura.dto';

import capitalizar from 'src/comuns/utils/capitalizar';

import { AssinaturaStatus } from 'src/adaptadores/persistencia/entidades/Assinatura.entidade';
import ValidatorPipe from '../pipes/Validator.pipe';

@Controller('/gestao/assinaturas')
class AssinaturaController extends ControllerBase {
  private readonly buscarAssinaturasCasoUso: BuscarAssinaturaCasoUso;
  private readonly cadastrarAssinaturaCasoUso: CadastrarAssinaturaCasoUso;
  private readonly excluirAssinaturaCasoUso: ExcluirAssinaturaCasoUso;
  private readonly atualizarAssinaturaCasoUso: AtualizarAssinaturaCasoUso;

  public constructor(
    buscarAssinaturasCasoUso: BuscarAssinaturaCasoUso,
    cadastrarAssinaturaCasoUso: CadastrarAssinaturaCasoUso,
    excluirAssinaturaCasoUso: ExcluirAssinaturaCasoUso,
    atualizarAssinaturaCasoUso: AtualizarAssinaturaCasoUso
  ) {
    super();
    this.buscarAssinaturasCasoUso = buscarAssinaturasCasoUso;
    this.cadastrarAssinaturaCasoUso = cadastrarAssinaturaCasoUso;
    this.excluirAssinaturaCasoUso = excluirAssinaturaCasoUso;
    this.atualizarAssinaturaCasoUso = atualizarAssinaturaCasoUso;
  }

  @Get()
  public async getAssinaturas() {
    const assinaturas = await this.buscarAssinaturasCasoUso.executar(); // Busca todos
    return this.sucesso(
      'Consulta realizada com sucesso!',
      assinaturas.map((assinatura) => assinatura.paraJson())
    );
  }

  @Get('/todos')
  public async getTodasAssinaturas() {
    return this.getAssinaturas();
  }

  @Get('/ativo')
  public async getAssinaturasAtivas() {
    const assinaturas = await this.buscarAssinaturasCasoUso.executar({
      status: AssinaturaStatus.ATIVO,
    });
    return this.sucesso(
      'Consulta realizada com sucesso!',
      assinaturas.map((assinatura) => assinatura.paraJson())
    );
  }

  @Get('/cancelado')
  public async getAssinaturasCanceladas() {
    const assinaturas = await this.buscarAssinaturasCasoUso.executar({
      status: AssinaturaStatus.CANCELADO,
    });
    return this.sucesso(
      'Consulta realizada com sucesso!',
      assinaturas.map((assinatura) => assinatura.paraJson())
    );
  }

  @Get('/:idAssinatura')
  public async getAssinaturaPorId(
    @Param('idAssinatura', ParseIntPipe)
    id: number
  ) {
    const [assinatura] = await this.buscarAssinaturasCasoUso.executar({
      codigo: id,
    });
    return this.sucesso(
      'Consulta realizada com sucesso!',
      assinatura.paraJson()
    );
  }

  @Get('/cliente/:codCliente')
  public async getAssinaturasCliente(
    @Param('codCliente', ParseIntPipe)
    codCliente: number
  ) {
    const assinaturas = await this.buscarAssinaturasCasoUso.executar({
      codCliente,
    });

    return this.sucesso(
      'Consulta realizada com sucesso!',
      assinaturas.map((assinatura) => assinatura.paraJson())
    );
  }

  @Get('/plano/:codPlano')
  public async getAssinaturasPlano(
    @Param('codPlano', ParseIntPipe)
    codPlano: number
  ) {
    const assinaturas = await this.buscarAssinaturasCasoUso.executar({
      codPlano,
    });

    return this.sucesso(
      'Consulta realizada com sucesso!',
      assinaturas.map((assinatura) => assinatura.paraJson())
    );
  }

  @Post()
  @UsePipes(new ValidatorPipe(CadastrarAssinaturaDtoSchema, 'body'))
  public async postAssinatura(
    @Body()
    dados: CadastrarAssinaturaDto
  ) {
    const assinatura = await this.cadastrarAssinaturaCasoUso.executar(dados);
    return this.sucesso(
      'Cadastro efetuado com sucesso!',
      assinatura.paraJson()
    );
  }

  @Patch('/:idAssinatura')
  @UsePipes(new ValidatorPipe(AtualizarAssinaturaDtoSchema, 'body'))
  public async patchAssinatura(
    @Param('idAssinatura', ParseIntPipe) id: number,
    @Body() dados: AtualizarAssinaturaDto
  ) {
    const assinatura = await this.atualizarAssinaturaCasoUso.executar(
      id,
      dados
    );
    return this.sucesso(
      'Atualizção efetuada com sucesso!',
      assinatura.paraJson()
    );
  }

  @Delete('/:idAssinatura')
  public async deleteAssinatura(@Param('idAssinatura', ParseIntPipe) id) {
    await this.excluirAssinaturaCasoUso.executar(id);
    return this.sucesso('Exclusão efetuada com sucesso!');
  }
}

export default AssinaturaController;
export { AssinaturaController };
