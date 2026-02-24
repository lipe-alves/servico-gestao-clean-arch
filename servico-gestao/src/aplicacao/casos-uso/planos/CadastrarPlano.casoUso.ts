import { Injectable } from '@nestjs/common';
import ICasoUso from 'src/aplicacao/interfaces/CasoUso.interface';
import PlanoServico from 'src/dominios/servicos/Plano.servico';
import PlanoModelo from 'src/dominios/modelos/Plano.modelo';
import { CadastrarPlanoDto } from 'src/aplicacao/dtos/planos/CadastrarPlano.dto';

@Injectable()
class CadastrarPlanoCasoUso implements ICasoUso {
  private readonly planoServico: PlanoServico;

  public constructor(planoServico: PlanoServico) {
    this.planoServico = planoServico;
  }

  public async executar(input: CadastrarPlanoDto): Promise<PlanoModelo> {
    const plano = await this.planoServico.criar({
      nome: input.nome,
      custoMensal: input.custoMensal,
      descricao: input.descricao,
      data: new Date(), // última atualização = data de criação
    });
    return plano;
  }
}

export default CadastrarPlanoCasoUso;
export { CadastrarPlanoCasoUso };
