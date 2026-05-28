import { z } from 'zod';

export const RegistrarPagamentoDtoSchema = z.object({
  codAssinatura: z.coerce.number(),
  dataPagamento: z.coerce.date(),
  valorPago: z.coerce.number(),
});

export type RegistrarPagamentoDto = z.infer<typeof RegistrarPagamentoDtoSchema>;
