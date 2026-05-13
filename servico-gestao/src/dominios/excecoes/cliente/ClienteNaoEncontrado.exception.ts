import { HttpStatus, NotFoundException } from '@nestjs/common';

class ClienteNaoEncontradoException extends NotFoundException {
  public constructor(dadosExtras?: Record<string, any>) {
    super({
      statusCode: HttpStatus.NOT_FOUND,
      codigo: 'CLIENTE_NAO_ENCONTRADO_ERROR',
      mensagem: 'Cliente não encontrado.',
      dados: dadosExtras,
    });
  }
}

export { ClienteNaoEncontradoException };
export default ClienteNaoEncontradoException;
