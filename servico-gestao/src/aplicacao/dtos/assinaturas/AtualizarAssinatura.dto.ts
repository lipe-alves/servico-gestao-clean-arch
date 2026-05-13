import z from 'zod';
import { CadastrarAssinaturaDtoSchema } from './CadastrarAssinatura.dto';

export const AtualizarAssinaturaDtoSchema =
  CadastrarAssinaturaDtoSchema.partial();

export type AtualizarAssinaturaDto = z.infer<
  typeof AtualizarAssinaturaDtoSchema
>;
