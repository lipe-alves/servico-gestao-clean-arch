import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import RepositorioBase from '@gestao-internet/comuns/RepositorioBase';
import Cliente from '../entidades/Cliente.entidade';

@Injectable()
class ClienteRepositorio extends RepositorioBase<Cliente> {
  public constructor(
    @InjectRepository(Cliente)
    repo: Repository<Cliente>
  ) {
    super(Cliente, repo);
  }
}

export default ClienteRepositorio;
export { ClienteRepositorio };
