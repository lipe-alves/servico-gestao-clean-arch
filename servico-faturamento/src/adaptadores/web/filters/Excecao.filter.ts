import {
  Catch,
  RpcExceptionFilter,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Observable, throwError } from 'rxjs';

@Catch()
class ExcecaoFilter implements RpcExceptionFilter<any> {
  public catch(exception: any, host: ArgumentsHost): Observable<any> {
    if (exception instanceof RpcException) {
      return throwError(() => exception.getError());
    }

    const resp = {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      codigo: 'ERRO_INTERNO_SERVIDOR',
      mensagem:
        exception.message || 'Ocorreu um erro inesperado no microsserviço.',
      dados: exception.stack,
    };

    return throwError(() => new RpcException(resp).getError());
  }
}

export { ExcecaoFilter };
export default ExcecaoFilter;
