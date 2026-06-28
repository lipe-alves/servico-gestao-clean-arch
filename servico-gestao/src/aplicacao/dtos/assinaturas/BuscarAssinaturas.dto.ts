import { AssinaturaStatus } from 'src/adaptadores/persistencia/entidades/Assinatura.entidade';
import { z } from 'zod';

export const BuscarAssinaturasDtoSchema = z.object({
  codigo: z.coerce.number().optional(),
  codPlano: z.coerce.number().optional(),
  codCliente: z.coerce.number().optional(),
  status: z
    .enum([
      'Todos',
      AssinaturaStatus.Cancelado,
      AssinaturaStatus.Ativo,
      AssinaturaStatus.Pendente,
      AssinaturaStatus.Vencido,
    ])
    .optional(),
});

export type BuscarAssinaturasDto = z.infer<typeof BuscarAssinaturasDtoSchema>;
