import { HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

class EmailInvalidoException extends RpcException {
  public constructor(dadosExtras?: Record<string, any>) {
    super({
      statusCode: HttpStatus.BAD_REQUEST,
      codigo: 'CLIENTE_EMAIL_INVALIDO_ERROR',
      mensagem: 'E-mail do cliente inválido.',
      dados: dadosExtras,
    });
  }
}

export { EmailInvalidoException };
export default EmailInvalidoException;
