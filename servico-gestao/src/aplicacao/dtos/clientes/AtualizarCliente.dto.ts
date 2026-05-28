import { z } from 'zod';
import { CadastrarClienteDtoSchema } from './CadastrarCliente.dto';

export const AtualizarClienteDtoSchema =
  CadastrarClienteDtoSchema.partial().extend({
    id: z.coerce.number(),
  });

export type AtualizarClienteDto = z.infer<typeof AtualizarClienteDtoSchema>;
