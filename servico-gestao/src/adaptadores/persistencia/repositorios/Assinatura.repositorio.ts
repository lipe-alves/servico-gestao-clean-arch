import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import RepositorioBase from "src/comuns/RepositorioBase";
import Assinatura from "../entidades/Assinatura.entidade";

@Injectable()
class AssinaturaRepositorio extends RepositorioBase<Assinatura> {
  public constructor(
    @InjectRepository(Assinatura)
    repo,
  ) {
    super(Assinatura, repo);
  }
}

export default AssinaturaRepositorio;
export { AssinaturaRepositorio };
