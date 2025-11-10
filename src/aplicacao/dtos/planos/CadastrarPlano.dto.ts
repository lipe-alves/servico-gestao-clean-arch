export interface CadastrarPlanoDto {
  nome: string;
  custoMensal: number;
  descricao: string;
}

export function validarCadastrarPlanoDto(
  dados: any,
): dados is CadastrarPlanoDto {
  if (typeof dados.nome !== 'string') return false;
  if (typeof dados.custoMensal !== 'number') return false;
  if (typeof dados.descricao !== 'string') return false;
  return true;
}
