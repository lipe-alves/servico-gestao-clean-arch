import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import RepositorioBase from '@gestao-internet/comuns/RepositorioBase';
import Plano from '../entidades/Plano.entidade';

@Injectable()
class PlanoRepositorio extends RepositorioBase<Plano> {
  public constructor(
    @InjectRepository(Plano)
    repo: Repository<Plano>
  ) {
    super(Plano, repo as any);
  }
}

export default PlanoRepositorio;
export { PlanoRepositorio };
