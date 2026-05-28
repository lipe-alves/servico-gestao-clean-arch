import { z } from 'zod';

export const BuscarPlanosDtoSchema = z.object({
  codigo: z.coerce.number().optional(),
});

export type BuscarPlanosDto = z.infer<typeof BuscarPlanosDtoSchema>;
