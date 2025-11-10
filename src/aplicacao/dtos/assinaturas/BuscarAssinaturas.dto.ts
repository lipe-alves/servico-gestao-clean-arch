import { AssinaturaStatus } from "src/adaptadores/persistencia/entidades/Assinatura.entidade";

export interface BuscarAssinaturasDto {
  codigo?: number;
  codPlano?: number;
  codCliente?: number;
  status?: AssinaturaStatus;
}

export function validarBuscarAssinaturasDto(
  dados: any,
): dados is BuscarAssinaturasDto {
  if (dados.codigo && typeof dados.codigo !== 'number') return false;
  if (dados.codPlano && typeof dados.codPlano !== 'number') return false;
  if (dados.codCliente && typeof dados.codCliente !== 'number') return false;
  if (typeof dados.status === 'string') {
    if (![AssinaturaStatus.ATIVO, AssinaturaStatus.CANCELADO].includes(dados.status)) return false;
  }
  return true;
}
