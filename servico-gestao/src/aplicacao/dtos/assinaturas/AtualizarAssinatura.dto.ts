import z from 'zod';
import { CadastrarAssinaturaDtoSchema } from './CadastrarAssinatura.dto';

export const AtualizarAssinaturaDtoSchema =
  CadastrarAssinaturaDtoSchema.partial().extend({
    id: z.coerce.number(),
    dataUltimoPagamento: z.coerce.date().optional(),
  });

export type AtualizarAssinaturaDto = z.infer<
  typeof AtualizarAssinaturaDtoSchema
>;
