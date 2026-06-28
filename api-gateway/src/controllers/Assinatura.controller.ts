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
  Dependencies,
  Logger,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { FILAS, MENSAGENS } from '@gestao-internet/comuns/constantes';
import { lastValueFrom } from 'rxjs';

import ControllerBase from '../base/ControllerBase';

import {
  CadastrarAssinaturaDto,
  CadastrarAssinaturaDtoSchema,
} from '../dtos/assinaturas/CadastrarAssinatura.dto';
import {
  AtualizarAssinaturaDto,
  AtualizarAssinaturaDtoSchema,
} from '../dtos/assinaturas/AtualizarAssinatura.dto';
import {
  PagarAssinaturaDto,
  PagarAssinaturaDtoSchema,
} from '../dtos/assinaturas/PagarAssinatura.dto';

import ValidatorPipe from '../pipes/Validator.pipe';

@Controller('/gestao/assinaturas')
@Dependencies(FILAS.GESTAO, FILAS.FATURAMENTO, FILAS.ASSINATURAS_ATIVAS)
class AssinaturaController extends ControllerBase {
  private readonly logger: Logger;
  private readonly filaGestao: ClientProxy;
  private readonly filaFaturamento: ClientProxy;
  private readonly filaAssinaturasAtivas: ClientProxy;

  public constructor(
    filaGestao: ClientProxy,
    filaFaturamento: ClientProxy,
    filaAssinaturasAtivas: ClientProxy
  ) {
    super();
    this.logger = new Logger('HTTP');
    this.filaGestao = filaGestao;
    this.filaFaturamento = filaFaturamento;
    this.filaAssinaturasAtivas = filaAssinaturasAtivas;
  }

  @Get()
  public async getAssinaturas() {
    let observavel = this.filaGestao.send(MENSAGENS.BUSCAR_ASSINATURAS, {});
    const assinaturas = await lastValueFrom(observavel);

    observavel = this.filaAssinaturasAtivas.send(
      MENSAGENS.CACHEAR_ASSINATURA_ATIVA,
      assinaturas.filter((assinatura: any) => assinatura.status === 'Ativo')
    );
    await lastValueFrom(observavel);

    return this.sucesso('Consulta realizada com sucesso!', assinaturas);
  }

  @Get('/todos')
  public getTodasAssinaturas() {
    return this.getAssinaturas();
  }

  @Get('/ativo')
  public async getAssinaturasAtivas() {
    // Primeiro busca do cache
    let observavel = this.filaAssinaturasAtivas.send(
      MENSAGENS.BUSCAR_ASSINATURAS_ATIVAS,
      {}
    );
    let assinaturas = await lastValueFrom(observavel);

    if (assinaturas.length > 0) {
      this.logger.log('Assinaturas ativas recuperados do cache');
      return this.sucesso('Consulta realizada com sucesso!', assinaturas);
    }

    // Se não achou nada no cache, busca diretamente do microsserviço
    observavel = this.filaGestao.send(MENSAGENS.BUSCAR_ASSINATURAS, {
      status: 'Ativo',
    });
    assinaturas = await lastValueFrom(observavel);

    this.logger.log('Assinaturas ativas recuperadas do miceosserviço');

    // Salva tudo no cache para que o próximo GET seja mais rápido
    observavel = this.filaAssinaturasAtivas.send(
      MENSAGENS.CACHEAR_ASSINATURA_ATIVA,
      assinaturas
    );
    await lastValueFrom(observavel);

    return this.sucesso('Consulta realizada com sucesso!', assinaturas);
  }

  @Get('/cancelado')
  public async getAssinaturasCanceladas() {
    console.log('GET /gestao/assinaturas/cancelado');
    const observavel = this.filaGestao.send(MENSAGENS.BUSCAR_ASSINATURAS, {
      status: 'Cancelado',
    });
    const assinaturas = await lastValueFrom(observavel);
    return this.sucesso('Consulta realizada com sucesso!', assinaturas);
  }

  @Get('/vencido')
  public async getAssinaturasVencidas() {
    console.log('GET /gestao/assinaturas/vencido');
    const observavel = this.filaGestao.send(MENSAGENS.BUSCAR_ASSINATURAS, {
      status: 'Vencido',
    });
    const assinaturas = await lastValueFrom(observavel);
    return this.sucesso('Consulta realizada com sucesso!', assinaturas);
  }

  @Get('/pendente')
  public async getAssinaturasPendentes() {
    console.log('GET /gestao/assinaturas/pendente');
    const observavel = this.filaGestao.send(MENSAGENS.BUSCAR_ASSINATURAS, {
      status: 'Pendente',
    });
    const assinaturas = await lastValueFrom(observavel);
    return this.sucesso('Consulta realizada com sucesso!', assinaturas);
  }

  @Get('/:idAssinatura')
  public async getAssinaturaPorId(
    @Param('idAssinatura', ParseIntPipe)
    id: number
  ) {
    console.log('GET /gestao/assinaturas/' + id);
    const observavel = this.filaGestao.send(MENSAGENS.BUSCAR_ASSINATURAS, {
      codigo: id,
    });
    const [assinatura] = await lastValueFrom(observavel);
    return this.sucesso('Consulta realizada com sucesso!', assinatura);
  }

  @Get('/cliente/:codCliente')
  public async getAssinaturasCliente(
    @Param('codCliente', ParseIntPipe)
    codCliente: number
  ) {
    const observavel = this.filaGestao.send(MENSAGENS.BUSCAR_ASSINATURAS, {
      codCliente,
    });
    const assinaturas = await lastValueFrom(observavel);

    return this.sucesso('Consulta realizada com sucesso!', assinaturas);
  }

  @Get('/plano/:codPlano')
  public async getAssinaturasPlano(
    @Param('codPlano', ParseIntPipe)
    codPlano: number
  ) {
    const observavel = this.filaGestao.send(MENSAGENS.BUSCAR_ASSINATURAS, {
      codPlano,
    });
    const assinaturas = await lastValueFrom(observavel);

    return this.sucesso('Consulta realizada com sucesso!', assinaturas);
  }

  @Post()
  @UsePipes(new ValidatorPipe(CadastrarAssinaturaDtoSchema, 'body'))
  public async postAssinatura(
    @Body()
    dados: CadastrarAssinaturaDto
  ) {
    const observavel = this.filaGestao.send(
      MENSAGENS.CADASTRAR_ASSINATURA,
      dados
    );
    const assinatura = await lastValueFrom(observavel);

    return this.sucesso('Cadastro efetuado com sucesso!', assinatura);
  }

  @Patch('/:idAssinatura')
  @UsePipes(new ValidatorPipe(AtualizarAssinaturaDtoSchema, 'body'))
  public async patchAssinatura(
    @Param('idAssinatura', ParseIntPipe) id: number,
    @Body() dados: AtualizarAssinaturaDto
  ) {
    const observavel = this.filaGestao.send(MENSAGENS.ATUALIZAR_ASSINATURA, {
      id,
      ...dados,
    });
    const assinatura = await lastValueFrom(observavel);
    return this.sucesso('Atualizção efetuada com sucesso!', assinatura);
  }

  @Delete('/:idAssinatura')
  public async deleteAssinatura(
    @Param('idAssinatura', ParseIntPipe) id: number
  ) {
    const observavel = this.filaGestao.send(MENSAGENS.EXCLUIR_ASSINATURA, id);
    await lastValueFrom(observavel);
    return this.sucesso('Exclusão efetuada com sucesso!');
  }

  @Post('/:idAssinatura/pagar')
  @UsePipes(new ValidatorPipe(PagarAssinaturaDtoSchema, 'body'))
  public async pagarAssinatura(
    @Param('idAssinatura', ParseIntPipe) id: number,
    @Body() dados: PagarAssinaturaDto
  ) {
    const observavel = this.filaFaturamento.send(
      MENSAGENS.REGISTRAR_PAGAMENTO,
      {
        codAssinatura: id,
        ...dados,
      }
    );
    await lastValueFrom(observavel);
    return this.sucesso('Pagamento efetuado com sucesso!');
  }
}

export default AssinaturaController;
export { AssinaturaController };
