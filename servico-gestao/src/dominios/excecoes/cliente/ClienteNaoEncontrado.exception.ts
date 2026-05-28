import { HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

class ClienteNaoEncontradoException extends RpcException {
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
