import { z } from 'zod';

export const CadastrarPlanoDtoSchema = z.object({
  nome: z.string(),
  custoMensal: z.coerce.number(),
  descricao: z.string(),
});

export type CadastrarPlanoDto = z.infer<typeof CadastrarPlanoDtoSchema>;
