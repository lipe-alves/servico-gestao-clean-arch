import { AssinaturaStatus } from "src/adaptadores/persistencia/entidades/Assinatura.entidade";

export interface CadastrarAssinaturaDto {
  codPlano: number;
  codCliente: number;
  inicioFidelidade: string;
  fimFidelidade: string;
  custoFinal: number;
  descricao: string;
  status: AssinaturaStatus;
}

export function validarCadastrarAssinaturaDto(
  dados: any,
): dados is CadastrarAssinaturaDto {
  if (typeof dados.codPlano !== 'number') return false;
  if (typeof dados.codCliente !== 'number') return false;
  if (typeof dados.inicioFidelidade !== 'string') return false;
  if (typeof dados.fimFidelidade !== 'string') return false;
  if (typeof dados.custoFinal !== 'number') return false;
  if (dados.descricao && typeof dados.descricao !== 'string') return false;
  if (typeof dados.status !== 'string') return false;
  return true;
}
