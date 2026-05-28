import { HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

class EmailVazioException extends RpcException {
  public constructor(dadosExtras?: Record<string, any>) {
    super({
      statusCode: HttpStatus.BAD_REQUEST,
      codigo: 'CLIENTE_EMAIL_VAZIO_ERROR',
      mensagem: 'O e-mail do cliente não pode estar vazio.',
      dados: dadosExtras,
    });
  }
}

export { EmailVazioException };
export default EmailVazioException;
