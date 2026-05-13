import { BadRequestException, HttpStatus } from '@nestjs/common';

class EmailInvalidoException extends BadRequestException {
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
