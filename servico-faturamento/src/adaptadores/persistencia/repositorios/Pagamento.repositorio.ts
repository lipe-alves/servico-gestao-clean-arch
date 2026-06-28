import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import RepositorioBase from '@gestao-internet/comuns/RepositorioBase';

import Pagamento from '../entidades/Pagamento.entidade';

@Injectable()
class PagamentoRepositorio extends RepositorioBase<Pagamento> {
  public constructor(
    @InjectRepository(Pagamento)
    repo: Repository<Pagamento>
  ) {
    super(Pagamento, repo as any);
  }
}

export default PagamentoRepositorio;
export { PagamentoRepositorio };
