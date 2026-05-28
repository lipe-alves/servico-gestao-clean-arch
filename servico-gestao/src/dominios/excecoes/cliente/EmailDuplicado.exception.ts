import { HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

class EmailDuplicadoException extends RpcException {
  public constructor(dadosExtras?: Record<string, any>) {
    super({
      statusCode: HttpStatus.BAD_REQUEST,
      codigo: 'CLIENTE_EMAIL_DUPLICADO_ERROR',
      mensagem: 'E-mail do cliente já cadastrado.',
      dados: dadosExtras,
    });
  }
}

export { EmailDuplicadoException };
export default EmailDuplicadoException;
