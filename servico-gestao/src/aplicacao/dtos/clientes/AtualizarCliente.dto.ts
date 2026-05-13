import { z } from 'zod';
import { CadastrarClienteDtoSchema } from './CadastrarCliente.dto';

export const AtualizarClienteDtoSchema = CadastrarClienteDtoSchema.partial();

export type AtualizarClienteDto = z.infer<typeof AtualizarClienteDtoSchema>;
