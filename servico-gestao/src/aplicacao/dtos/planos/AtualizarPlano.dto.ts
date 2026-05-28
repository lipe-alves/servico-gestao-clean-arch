import { CadastrarPlanoDtoSchema } from './CadastrarPlano.dto';
import { z } from 'zod';

export const AtualizarPlanoDtoSchema = CadastrarPlanoDtoSchema.partial().extend(
  {
    id: z.coerce.number(),
  }
);

export type AtualizarPlanoDto = z.infer<typeof AtualizarPlanoDtoSchema>;
