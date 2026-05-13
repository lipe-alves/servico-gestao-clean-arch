import { AssinaturaStatus } from 'src/adaptadores/persistencia/entidades/Assinatura.entidade';

export interface BuscarAssinaturasDto {
  codigo?: number;
  codPlano?: number;
  codCliente?: number;
  status?: AssinaturaStatus;
}
