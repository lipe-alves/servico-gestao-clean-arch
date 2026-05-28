import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import z from 'zod';

interface IRespostaErro {
  codigo: string;
  mensagem: string;
  dados?: any;
}

@Injectable()
class ValidatorPipe implements PipeTransform {
  public constructor(private schema: z.ZodObject<any>) {}

  private traduzirErroZod(issue: z.ZodIssue): RpcException {
    const campo = issue.path.join('.');

    return new RpcException({
      codigo: 'ERRO_VALIDACAO',
      mensagem: `Erro de validação no campo: ${campo}`,
      dados: {
        campo,
        detalhes: issue.message,
        codigo: issue.code,
      },
    } as IRespostaErro);
  }

  public transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type !== 'body' && metadata.type !== 'custom') {
      return value;
    }

    const resultado = this.schema.safeParse(value);

    if (resultado.success) {
      return resultado.data;
    }

    const [issue] = resultado.error.issues;
    const erroValidacao = this.traduzirErroZod(issue);

    throw erroValidacao;
  }
}

export default ValidatorPipe;
export { ValidatorPipe };
