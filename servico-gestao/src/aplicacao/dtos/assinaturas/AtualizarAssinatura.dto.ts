import { AssinaturaStatus } from "src/adaptadores/persistencia/entidades/Assinatura.entidade";

export interface AtualizarAssinaturaDto {
  codPlano?: number;
  codCliente?: number;
  inicioFidelidade?: string;
  fimFidelidade?: string;
  custoFinal?: number;
  descricao?: string;
  status?: AssinaturaStatus;
}

export function validarAtualizarAssinaturaDto(
  dados: any,
): dados is AtualizarAssinaturaDto {
  if (dados.codPlano && typeof dados.codPlano !== 'number') return false;
  if (dados.codCliente && typeof dados.codCliente !== 'number') return false;
  if (dados.inicioFidelidade && typeof dados.inicioFidelidade !== 'string') return false;
  if (dados.fimFidelidade && typeof dados.fimFidelidade !== 'string') return false;
  if (dados.custoFinal && typeof dados.custoFinal !== 'number') return false;
  if (dados.descricao && typeof dados.descricao !== 'string') return false;
  if (typeof dados.status === 'string') {
    if (![AssinaturaStatus.ATIVO, AssinaturaStatus.CANCELADO].includes(dados.status)) return false;
  }
  return true;
}
