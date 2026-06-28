import z from 'zod';
import { CadastrarAssinaturaDtoSchema } from './CadastrarAssinatura.dto';

export const AtualizarAssinaturaDtoSchema =
  CadastrarAssinaturaDtoSchema.partial().extend({
    id: z.coerce.number(),
    inicioFidelidade: z.coerce.date(),
  });

export type AtualizarAssinaturaDto = z.infer<
  typeof AtualizarAssinaturaDtoSchema
>;
