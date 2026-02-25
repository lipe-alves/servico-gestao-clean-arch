import { Injectable } from "@nestjs/common";
import ICasoUso from "src/aplicacao/interfaces/CasoUso.interface";
import AssinaturaServico from "src/dominios/servicos/Assinatura.servico";

@Injectable()
class ExcluirAssinaturaCasoUso implements ICasoUso {
  private readonly assinaturaServico: AssinaturaServico;

  public constructor(AssinaturaServico: AssinaturaServico) {
    this.assinaturaServico = AssinaturaServico;
  }

  public async executar(id: number): Promise<void> {
    await this.assinaturaServico.excluir(id);
  }
}

export default ExcluirAssinaturaCasoUso;
export { ExcluirAssinaturaCasoUso };
