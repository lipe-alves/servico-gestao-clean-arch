import { z } from 'zod';

export const CadastrarAssinaturaDtoSchema = z.object({
  codPlano: z.coerce.number(),
  codCliente: z.coerce.number(),
  custoFinal: z.coerce.number(),
  diaVencimento: z.coerce.number().min(1).max(31),
  descricao: z.string(),
});

export type CadastrarAssinaturaDto = z.infer<
  typeof CadastrarAssinaturaDtoSchema
>;
