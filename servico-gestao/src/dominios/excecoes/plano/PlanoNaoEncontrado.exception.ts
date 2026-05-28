import { HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

class PlanoNaoEncontradoException extends RpcException {
  public constructor(dadosExtras?: Record<string, any>) {
    super({
      statusCode: HttpStatus.NOT_FOUND,
      codigo: 'PLANO_NAO_ENCONTRADO_ERROR',
      mensagem: 'Plano não encontrado.',
      dados: dadosExtras,
    });
  }
}

export { PlanoNaoEncontradoException };
export default PlanoNaoEncontradoException;
