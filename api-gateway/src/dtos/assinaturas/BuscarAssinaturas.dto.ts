import { z } from 'zod';

export const BuscarAssinaturasDtoSchema = z.object({
  codigo: z.coerce.number().optional(),
  codPlano: z.coerce.number().optional(),
  codCliente: z.coerce.number().optional(),
  status: z
    .enum(['Todos', 'Ativo', 'Cancelado', 'Vencido', 'Pendente'] as const)
    .optional(),
});

export type BuscarAssinaturasDto = z.infer<typeof BuscarAssinaturasDtoSchema>;
