import { HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

class AssinaturaNaoEncontradaException extends RpcException {
  public constructor(dadosExtras?: Record<string, any>) {
    super({
      statusCode: HttpStatus.BAD_REQUEST,
      codigo: 'ASSINATURA_NAO_ENCONTRADA_ERROR',
      mensagem: 'Assinatura não encontrada.',
      dados: dadosExtras,
    });
  }
}

export { AssinaturaNaoEncontradaException };
export default AssinaturaNaoEncontradaException;
