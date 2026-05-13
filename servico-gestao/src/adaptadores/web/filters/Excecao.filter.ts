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

  public catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const dadosExececao =
      exception instanceof HttpException
        ? exception.getResponse()
        : { mensagem: 'Erro interno do servidor' };

    const erro = (
      typeof dadosExececao === 'object'
        ? dadosExececao
        : {
            codigo: 'ERRO_INTERNO_SERVIDOR',
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            mensagem: dadosExececao,
          }
    ) as IRespostaApi;

    this.logger.error(
      `Metodo: ${request.method} | URL: ${request.url} | Status: ${status}`,
      exception instanceof Error ? exception.stack : ''
    );

    response.status(status).json({
      ...erro,
      dataHora: new Date().toISOString(),
      rota: request.url,
    });
  }
}

export default ExcecaoFilter;
export { ExcecaoFilter };
