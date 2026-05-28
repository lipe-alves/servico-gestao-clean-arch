import { z } from 'zod';

export const PagarAssinaturaDtoSchema = z.object({
  dataPagamento: z.coerce.date(),
  valorPago: z.coerce.number(),
});

export type PagarAssinaturaDto = z.infer<typeof PagarAssinaturaDtoSchema>;
