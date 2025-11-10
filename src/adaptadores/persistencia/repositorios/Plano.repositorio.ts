import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import RepositorioBase from 'src/comuns/RepositorioBase';
import Plano from '../entidades/Plano.entidade';

@Injectable()
class PlanoRepositorio extends RepositorioBase<Plano> {
  public constructor(
    @InjectRepository(Plano)
    repo,
  ) {
    super(Plano, repo);
  }
}

export default PlanoRepositorio;
export { PlanoRepositorio };
