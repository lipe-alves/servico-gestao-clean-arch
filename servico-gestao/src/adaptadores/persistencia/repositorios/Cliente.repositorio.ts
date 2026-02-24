import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import RepositorioBase from 'src/comuns/RepositorioBase';
import Cliente from '../entidades/Cliente.entidade';

@Injectable()
class ClienteRepositorio extends RepositorioBase<Cliente> {
  public constructor(
    @InjectRepository(Cliente)
    repo
  ) {
    super(Cliente, repo);
  }
}

export default ClienteRepositorio;
export { ClienteRepositorio };
