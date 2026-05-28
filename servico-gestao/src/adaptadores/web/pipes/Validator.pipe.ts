import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  HttpStatus,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import z from 'zod';

@Injectable()
class ValidatorPipe implements PipeTransform {
  private schema: z.ZodObject<any>;

  public constructor(schema: z.ZodObject<any>) {
    this.schema = schema;
  }

  private traduzirErroZod(issue: z.ZodIssue): RpcException {
    const campo = issue.path.join('.');

    return new RpcException({
      statusCode: HttpStatus.BAD_REQUEST,
      codigo: 'ERRO_VALIDACAO',
      mensagem: `Erro de validação no campo: ${campo}`,
      dados: {
        campo,
        detalhes: issue.message,
        codigo: issue.code,
      },
    });
  }

  public transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type !== 'body') {
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
