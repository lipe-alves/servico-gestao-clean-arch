import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import RepositorioBase from 'src/adaptadores/persistencia/base/RepositorioBase';
import Plano from '../entidades/Plano.entidade';
import { Repository } from 'typeorm';

@Injectable()
class PlanoRepositorio extends RepositorioBase<Plano> {
  public constructor(
    @InjectRepository(Plano)
    repo: Repository<Plano>
  ) {
    super(Plano, repo);
  }
}

export default PlanoRepositorio;
export { PlanoRepositorio };
