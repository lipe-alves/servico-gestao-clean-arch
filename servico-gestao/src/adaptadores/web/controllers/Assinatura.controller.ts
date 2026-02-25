import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Param,
  Patch,
} from "@nestjs/common";
import ControllerBase from "src/comuns/ControllerBase";

import BuscarAssinaturaCasoUso from "src/aplicacao/casos-uso/assinaturas/BuscarAssinaturas.casoUso";
import {
  BuscarAssinaturasDto,
  validarBuscarAssinaturasDto,
} from "src/aplicacao/dtos/assinaturas/BuscarAssinaturas.dto";
import CadastrarAssinaturaCasoUso from "src/aplicacao/casos-uso/assinaturas/CadastrarAssinatura.casoUso";
import { validarCadastrarAssinaturaDto } from "src/aplicacao/dtos/assinaturas/CadastrarAssinatura.dto";
import ExcluirAssinaturaCasoUso from "src/aplicacao/casos-uso/assinaturas/ExcluirAssinatura.casoUso";
import AtualizarAssinaturaCasoUso from "src/aplicacao/casos-uso/assinaturas/AtualizarAssinatura.casoUso";
import { validarAtualizarAssinaturaDto } from "src/aplicacao/dtos/assinaturas/AtualizarAssinatura.dto";

import ehNumerico from "src/comuns/utils/ehNumerico";
import capitalizar from "src/comuns/utils/capitalizar";

@Controller("/gestao/assinaturas")
class AssinaturaController extends ControllerBase {
  private readonly buscarAssinaturasCasoUso: BuscarAssinaturaCasoUso;
  private readonly cadastrarAssinaturaCasoUso: CadastrarAssinaturaCasoUso;
  private readonly excluirAssinaturaCasoUso: ExcluirAssinaturaCasoUso;
  private readonly atualizarAssinaturaCasoUso: AtualizarAssinaturaCasoUso;

  public constructor(
    buscarAssinaturasCasoUso: BuscarAssinaturaCasoUso,
    cadastrarAssinaturaCasoUso: CadastrarAssinaturaCasoUso,
    excluirAssinaturaCasoUso: ExcluirAssinaturaCasoUso,
    atualizarAssinaturaCasoUso: AtualizarAssinaturaCasoUso,
  ) {
    super();
    this.buscarAssinaturasCasoUso = buscarAssinaturasCasoUso;
    this.cadastrarAssinaturaCasoUso = cadastrarAssinaturaCasoUso;
    this.excluirAssinaturaCasoUso = excluirAssinaturaCasoUso;
    this.atualizarAssinaturaCasoUso = atualizarAssinaturaCasoUso;
  }

  @Get()
  public async getAssinaturas() {
    try {
      const assinaturas = await this.buscarAssinaturasCasoUso.executar(); // Busca todos
      return this.sucesso(
        "Consulta realizada com sucesso!",
        assinaturas.map((assinatura) => assinatura.paraJson()),
      );
    } catch (err) {
      return this.falha(err);
    }
  }

  @Get("/:statusOuCodigo")
  public async getAssinatura(
    @Param("statusOuCodigo")
    statusOuCodigo,
  ) {
    try {
      const params: any = {};

      if (ehNumerico(statusOuCodigo)) {
        params.codigo = Number(statusOuCodigo);

        if (!validarBuscarAssinaturasDto(params)) {
          throw new Error(
            "Parâmetros incorretos. Verifique a documentação da API.",
          );
        }

        const [assinatura] =
          await this.buscarAssinaturasCasoUso.executar(params);
        return this.sucesso(
          "Consulta realizada com sucesso!",
          assinatura.paraJson(),
        );
      }

      params.status = capitalizar(statusOuCodigo);

      if (!validarBuscarAssinaturasDto(params)) {
        throw new Error(
          "Parâmetros incorretos. Verifique a documentação da API.",
        );
      }

      const assinaturas = await this.buscarAssinaturasCasoUso.executar(params);

      return this.sucesso(
        "Consulta realizada com sucesso!",
        assinaturas.map((assinatura) => assinatura.paraJson()),
      );
    } catch (err) {
      return this.falha(err);
    }
  }

  @Get("/cliente/:codCliente")
  public async getAssinaturasCliente(
    @Param("codCliente")
    codCliente,
  ) {
    try {
      const assinaturas = await this.buscarAssinaturasCasoUso.executar({
        codCliente,
      });

      return this.sucesso(
        "Consulta realizada com sucesso!",
        assinaturas.map((assinatura) => assinatura.paraJson()),
      );
    } catch (err) {
      return this.falha(err);
    }
  }

  @Get("/plano/:codPlano")
  public async getAssinaturasPlano(
    @Param("codPlano")
    codPlano,
  ) {
    try {
      const assinaturas = await this.buscarAssinaturasCasoUso.executar({
        codPlano,
      });

      return this.sucesso(
        "Consulta realizada com sucesso!",
        assinaturas.map((assinatura) => assinatura.paraJson()),
      );
    } catch (err) {
      return this.falha(err);
    }
  }

  @Post()
  public async postAssinatura(
    @Body()
    dados,
  ) {
    try {
      if (!validarCadastrarAssinaturaDto(dados)) {
        throw new Error(
          "Parâmetros incorretos. Verifique a documentação da API.",
        );
      }

      const assinatura = await this.cadastrarAssinaturaCasoUso.executar(dados);
      return this.sucesso(
        "Cadastro efetuado com sucesso!",
        assinatura.paraJson(),
      );
    } catch (err) {
      return this.falha(err);
    }
  }

  @Patch("/:idAssinatura")
  public async patchAssinatura(@Param("idAssinatura") id, @Body() dados) {
    try {
      if (!validarAtualizarAssinaturaDto(dados)) {
        throw new Error(
          "Parâmetros incorretos. Verifique a documentação da API.",
        );
      }

      const assinatura = await this.atualizarAssinaturaCasoUso.executar(
        id,
        dados,
      );
      return this.sucesso(
        "Atualizção efetuada com sucesso!",
        assinatura.paraJson(),
      );
    } catch (err) {
      return this.falha(err);
    }
  }

  @Delete("/:idAssinatura")
  public async deleteAssinatura(@Param("idAssinatura") id) {
    try {
      if (!ehNumerico(id)) throw new Error("O id deve ser um número!");
      await this.excluirAssinaturaCasoUso.executar(id);
      return this.sucesso("Exclusão efetuada com sucesso!");
    } catch (err) {
      return this.falha(err);
    }
  }
}

export default AssinaturaController;
export { AssinaturaController };
