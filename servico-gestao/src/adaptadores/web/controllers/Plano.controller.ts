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

import BuscarPlanoCasoUso from "src/aplicacao/casos-uso/planos/BuscarPlanos.casoUso";
import CadastrarPlanoCasoUso from "src/aplicacao/casos-uso/planos/CadastrarPlano.casoUso";
import { validarCadastrarPlanoDto } from "src/aplicacao/dtos/planos/CadastrarPlano.dto";
import ExcluirPlanoCasoUso from "src/aplicacao/casos-uso/planos/ExcluirPlano.casoUso";
import AtualizarPlanoCasoUso from "src/aplicacao/casos-uso/planos/AtualizarPlano.casoUso";
import { validarAtualizarPlanoDto } from "src/aplicacao/dtos/planos/AtualizarPlano.dto";
import ehNumerico from "src/comuns/utils/ehNumerico";

@Controller("/gestao/planos")
class PlanoController extends ControllerBase {
  private readonly buscarPlanosCasoUso: BuscarPlanoCasoUso;
  private readonly cadastrarPlanoCasoUso: CadastrarPlanoCasoUso;
  private readonly excluirPlanoCasoUso: ExcluirPlanoCasoUso;
  private readonly atualizarPlanoCasoUso: AtualizarPlanoCasoUso;

  public constructor(
    buscarPlanosCasoUso: BuscarPlanoCasoUso,
    cadastrarPlanoCasoUso: CadastrarPlanoCasoUso,
    excluirPlanoCasoUso: ExcluirPlanoCasoUso,
    atualizarPlanoCasoUso: AtualizarPlanoCasoUso,
  ) {
    super();
    this.buscarPlanosCasoUso = buscarPlanosCasoUso;
    this.cadastrarPlanoCasoUso = cadastrarPlanoCasoUso;
    this.excluirPlanoCasoUso = excluirPlanoCasoUso;
    this.atualizarPlanoCasoUso = atualizarPlanoCasoUso;
  }

  @Get()
  public async getPlanos() {
    try {
      const planos = await this.buscarPlanosCasoUso.executar(); // Busca todos
      return this.sucesso(
        "Consulta realizada com sucesso!",
        planos.map((plano) => plano.paraJson()),
      );
    } catch (err) {
      return this.falha(err);
    }
  }

  @Get("/:idPlano")
  public async getPlano(
    @Param("idPlano")
    id,
  ) {
    try {
      if (!ehNumerico(id)) throw new Error("O id deve ser um número!");

      const [plano] = await this.buscarPlanosCasoUso.executar(id);
      if (!plano) throw new Error("Plano não encontrado!");

      return this.sucesso("Consulta realizada com sucesso!", plano.paraJson());
    } catch (err) {
      return this.falha(err);
    }
  }

  @Post()
  public async postPlano(
    @Body()
    dados,
  ) {
    try {
      if (!validarCadastrarPlanoDto(dados)) {
        throw new Error(
          "Parâmetros incorretos. Verifique a documentação da API.",
        );
      }

      const plano = await this.cadastrarPlanoCasoUso.executar(dados);
      return this.sucesso("Cadastro efetuado com sucesso!", plano.paraJson());
    } catch (err) {
      return this.falha(err);
    }
  }

  @Patch("/:idPlano")
  public async patchPlano(@Param("idPlano") id, @Body() dados) {
    try {
      if (!ehNumerico(id)) throw new Error("O id deve ser um número!");

      if (!validarAtualizarPlanoDto(dados)) {
        throw new Error(
          "Parâmetros incorretos. Verifique a documentação da API.",
        );
      }

      const plano = await this.atualizarPlanoCasoUso.executar(id, dados);
      return this.sucesso("Atualizção efetuada com sucesso!", plano.paraJson());
    } catch (err) {
      return this.falha(err);
    }
  }

  @Delete("/:idPlano")
  public async deletePlano(
    @Param("idPlano")
    id,
  ) {
    try {
      if (!ehNumerico(id)) throw new Error("O id deve ser um número!");
      await this.excluirPlanoCasoUso.executar(id);
      return this.sucesso("Exclusão efetuada com sucesso!");
    } catch (err) {
      return this.falha(err);
    }
  }
}

export default PlanoController;
export { PlanoController };
