export interface CadastrarClienteDto {
  nome: string;
  email: string;
}

export function validarCadastrarClienteDto(
  dados: any,
): dados is CadastrarClienteDto {
  if (typeof dados.nome !== 'string') return false;
  if (typeof dados.email !== 'string') return false;
  return true;
}
