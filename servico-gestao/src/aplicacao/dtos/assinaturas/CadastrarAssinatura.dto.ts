import { z } from 'zod';

import { AssinaturaStatus } from 'src/adaptadores/persistencia/entidades/Assinatura.entidade';

export const CadastrarAssinaturaDtoSchema = z.object({
  codPlano: z.coerce.number(),
  codCliente: z.coerce.number(),
  inicioFidelidade: z.coerce.date(),
  fimFidelidade: z.coerce.date(),
  custoFinal: z.coerce.number(),
  descricao: z.string(),
  status: z.enum([AssinaturaStatus.ATIVO, AssinaturaStatus.CANCELADO]),
});

export type CadastrarAssinaturaDto = z.infer<
  typeof CadastrarAssinaturaDtoSchema
>;
