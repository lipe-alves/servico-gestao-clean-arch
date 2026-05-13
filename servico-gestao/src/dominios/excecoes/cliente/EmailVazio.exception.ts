import { BadRequestException, HttpStatus } from '@nestjs/common';

class EmailVazioException extends BadRequestException {
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
