import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import IRespostaApi from '../interfaces/RespostaApi.interface';

@Catch()
class ExcecaoFilter implements ExceptionFilter {
  private readonly logger = new Logger('Exceptions');

  public catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let erro: IRespostaApi;
    let status: HttpStatus;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const dados = exception.getResponse();
      erro =
        typeof dados === 'object'
          ? (dados as IRespostaApi)
          : {
              codigo: 'ERRO_INTERNO_SERVIDOR',
              statusCode: status,
              mensagem: dados,
            };
    } else if (exception.statusCode && exception.codigo && exception.mensagem) {
      status = exception.statusCode;
      erro = {
        codigo: exception.codigo,
        statusCode: exception.statusCode,
        mensagem: exception.mensagem,
        dados: exception.dados,
      };
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      erro = {
        codigo: 'ERRO_INTERNO_SERVIDOR',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        mensagem: 'Erro interno do servidor',
      };
    }

    this.logger.error(
      `Metodo: ${request.method} | URL: ${request.url} | Status: ${status}`,
      exception
    );

    response.status(status).json({
      ...erro,
      metodo: request.method,
      rota: request.url,
      dataHora: new Date().toISOString(),
    });
  }
}

export default ExcecaoFilter;
export { ExcecaoFilter };
