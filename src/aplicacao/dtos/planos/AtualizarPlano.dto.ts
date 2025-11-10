export interface AtualizarPlanoDto {
  nome?: string;
  custoMensal?: number;
  descricao?: string;
}

export function validarAtualizarPlanoDto(
  dados: any,
): dados is AtualizarPlanoDto {
  if (dados.nome && typeof dados.nome !== 'string') return false;
  if (dados.custoMensal && typeof dados.custoMensal !== 'number') return false;
  if (dados.descricao && typeof dados.descricao !== 'string') return false;
  return true;
}
