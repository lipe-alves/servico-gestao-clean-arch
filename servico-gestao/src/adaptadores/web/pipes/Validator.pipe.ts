import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  Paramtype,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';
import z from 'zod';
import IRespostaApi from '../interfaces/RespostaApi.interface';

@Injectable()
class ValidatorPipe implements PipeTransform {
  private schema: z.ZodObject<any>;
  private type: Paramtype;

  public constructor(schema: z.ZodObject<any>, type: Paramtype) {
    this.schema = schema;
    this.type = type;
  }

  private traduzirErroZod(issue: z.ZodIssue): BadRequestException {
    const campo = issue.path.join('.');

    return new BadRequestException({
      statusCode: HttpStatus.BAD_REQUEST,
      codigo: 'ERRO_VALIDACAO',
      mensagem: `Erro de validação no campo: ${campo}`,
      dados: {
        campo,
        detalhes: issue.message,
        codigo: issue.code,
      },
    } as IRespostaApi);
  }

  public transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type !== this.type) return value;

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
