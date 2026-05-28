import { z } from 'zod';

export const CadastrarClienteDtoSchema = z.object({
  nome: z.string(),
  email: z.email(),
});

export type CadastrarClienteDto = z.infer<typeof CadastrarClienteDtoSchema>;
