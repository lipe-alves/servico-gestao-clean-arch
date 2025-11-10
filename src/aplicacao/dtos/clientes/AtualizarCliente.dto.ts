export interface AtualizarClienteDto {
  nome?: string;
  email?: string;
}

export function validarAtualizarClienteDto(
  dados: any,
): dados is AtualizarClienteDto {
  if (dados.nome && typeof dados.nome !== 'string') return false;
  if (dados.email && typeof dados.email !== 'string') return false;
  return true;
}
