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

import BuscarClienteCasoUso from "src/aplicacao/casos-uso/clientes/BuscarClientes.casoUso";
import CadastrarClienteCasoUso from "src/aplicacao/casos-uso/clientes/CadastrarCliente.casoUso";
import { validarCadastrarClienteDto } from "src/aplicacao/dtos/clientes/CadastrarCliente.dto";
import ExcluirClienteCasoUso from "src/aplicacao/casos-uso/clientes/ExcluirCliente.casoUso";
import AtualizarClienteCasoUso from "src/aplicacao/casos-uso/clientes/AtualizarCliente.casoUso";
import { validarAtualizarClienteDto } from "src/aplicacao/dtos/clientes/AtualizarCliente.dto";

@Controller("/gestao/clientes")
class ClienteController extends ControllerBase {
  private readonly buscarClientesCasoUso: BuscarClienteCasoUso;
  private readonly cadastrarClienteCasoUso: CadastrarClienteCasoUso;
  private readonly excluirClienteCasoUso: ExcluirClienteCasoUso;
  private readonly atualizarClienteCasoUso: AtualizarClienteCasoUso;

  public constructor(
    buscarClientesCasoUso: BuscarClienteCasoUso,
    cadastrarClienteCasoUso: CadastrarClienteCasoUso,
    excluirClienteCasoUso: ExcluirClienteCasoUso,
    atualizarClienteCasoUso: AtualizarClienteCasoUso,
  ) {
    super();
    this.buscarClientesCasoUso = buscarClientesCasoUso;
    this.cadastrarClienteCasoUso = cadastrarClienteCasoUso;
    this.excluirClienteCasoUso = excluirClienteCasoUso;
    this.atualizarClienteCasoUso = atualizarClienteCasoUso;
  }

  @Get()
  public async getClientes() {
    try {
      const clientes = await this.buscarClientesCasoUso.executar(); // Busca todos
      return this.sucesso(
        "Consulta realizada com sucesso!",
        clientes.map((cliente) => cliente.paraJson()),
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
      const [cliente] = await this.buscarClientesCasoUso.executar(id);
      return this.sucesso(
        "Consulta realizada com sucesso!",
        cliente.paraJson(),
      );
    } catch (err) {
      return this.falha(err);
    }
  }

  @Post()
  public async postCliente(
    @Body()
    dados,
  ) {
    try {
      if (!validarCadastrarClienteDto(dados)) {
        throw new Error(
          "Parâmetros incorretos. Verifique a documentação da API.",
        );
      }

      const cliente = await this.cadastrarClienteCasoUso.executar(dados);
      return this.sucesso("Cadastro efetuado com sucesso!", cliente.paraJson());
    } catch (err) {
      return this.falha(err);
    }
  }

  @Patch("/:idCliente")
  public async patchCliente(@Param("idCliente") id, @Body() dados) {
    try {
      if (!validarAtualizarClienteDto(dados)) {
        throw new Error(
          "Parâmetros incorretos. Verifique a documentação da API.",
        );
      }

      const cliente = await this.atualizarClienteCasoUso.executar(id, dados);
      return this.sucesso(
        "Atualizção efetuada com sucesso!",
        cliente.paraJson(),
      );
    } catch (err) {
      return this.falha(err);
    }
  }

  @Delete("/:idCliente")
  public async deleteCliente(
    @Param("idCliente")
    id,
  ) {
    try {
      await this.excluirClienteCasoUso.executar(id);
      return this.sucesso("Exclusão efetuada com sucesso!");
    } catch (err) {
      return this.falha(err);
    }
  }
}

export default ClienteController;
export { ClienteController };
