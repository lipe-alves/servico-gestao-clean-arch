import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RepositorioBase } from '@gestao-internet/comuns/RepositorioBase';
import Assinatura from '../entidades/Assinatura.entidade';

@Injectable()
class AssinaturaRepositorio extends RepositorioBase<Assinatura> {
  public constructor(
    @InjectRepository(Assinatura)
    repo: Repository<Assinatura>
  ) {
    super(Assinatura, repo as any);
  }
}

export default AssinaturaRepositorio;
export { AssinaturaRepositorio };
