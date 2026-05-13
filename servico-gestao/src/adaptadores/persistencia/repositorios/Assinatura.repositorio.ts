import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import RepositorioBase from 'src/adaptadores/persistencia/base/RepositorioBase';
import Assinatura from '../entidades/Assinatura.entidade';
import { Repository } from 'typeorm';

@Injectable()
class AssinaturaRepositorio extends RepositorioBase<Assinatura> {
  public constructor(
    @InjectRepository(Assinatura)
    repo: Repository<Assinatura>
  ) {
    super(Assinatura, repo);
  }
}

export default AssinaturaRepositorio;
export { AssinaturaRepositorio };
