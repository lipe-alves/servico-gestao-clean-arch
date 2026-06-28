import z from 'zod';
import { CadastrarAssinaturaDtoSchema } from './CadastrarAssinatura.dto';

export const AtualizarAssinaturaDtoSchema =
  CadastrarAssinaturaDtoSchema.partial().extend({
    inicioFidelidade: z.coerce.date(),
  });

export type AtualizarAssinaturaDto = z.infer<
  typeof AtualizarAssinaturaDtoSchema
>;
