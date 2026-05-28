import { CadastrarPlanoDtoSchema } from './CadastrarPlano.dto';
import { z } from 'zod';

export const AtualizarPlanoDtoSchema = CadastrarPlanoDtoSchema.partial();

export type AtualizarPlanoDto = z.infer<typeof AtualizarPlanoDtoSchema>;
