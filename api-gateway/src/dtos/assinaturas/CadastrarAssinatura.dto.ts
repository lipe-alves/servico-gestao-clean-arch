import { z } from 'zod';

export const CadastrarAssinaturaDtoSchema = z.object({
  codPlano: z.coerce.number(),
  codCliente: z.coerce.number(),
  inicioFidelidade: z.coerce.date(),
  fimFidelidade: z.coerce.date(),
  custoFinal: z.coerce.number(),
  descricao: z.string(),
  status: z.enum(['Ativo', 'Cancelado'] as const),
});

export type CadastrarAssinaturaDto = z.infer<
  typeof CadastrarAssinaturaDtoSchema
>;
