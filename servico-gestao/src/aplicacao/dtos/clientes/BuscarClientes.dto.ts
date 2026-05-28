import { z } from 'zod';

export const BuscarClientesDtoSchema = z.object({
  codigo: z.coerce.number().optional(),
});

export type BuscarClientesDto = z.infer<typeof BuscarClientesDtoSchema>;
