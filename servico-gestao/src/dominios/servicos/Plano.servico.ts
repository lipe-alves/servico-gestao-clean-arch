import { Injectable } from '@nestjs/common';
import ServicoBase from 'src/comuns/ServicoBase';

import PlanoEntidade from 'src/adaptadores/persistencia/entidades/Plano.entidade';
import PlanoModelo from '../modelos/Plano.modelo';
import PlanoRepositorio from 'src/adaptadores/persistencia/repositorios/Plano.repositorio';

@Injectable()
class PlanoServico extends ServicoBase<PlanoEntidade, PlanoModelo> {
  public constructor(repo: PlanoRepositorio) {
    super(repo, PlanoModelo.criar);
  }

  public async criar(dados: Omit<PlanoEntidade, 'codigo'>): Promise<PlanoModelo> {
    if (!dados.nome) throw new Error("O nome não pode ser vazio!");
    if (!dados.custoMensal) throw new Error("O custo mensal não pode ser vazio!");
    if (dados.custoMensal <= 0) throw new Error("O custo mensal não pode ser igual ou menos que zero!");

    return super.criar(dados);
  }

  public async atualizar(id: number, dados: Partial<PlanoEntidade>): Promise<PlanoModelo> {
    if (typeof dados.nome === "string" && !dados.nome) throw new Error("O nome não pode ser vazio!");
    if (typeof dados.custoMensal === "number") {
      if (dados.custoMensal <= 0) throw new Error("O custo mensal não pode ser igual ou menos que zero!");
    }

    return super.atualizar(id, dados);
  }
}

export default PlanoServico;
export { PlanoServico };
