import { HttpStatus, NotFoundException } from '@nestjs/common';

class AssinaturaNaoEncontradaException extends NotFoundException {
  public constructor(dadosExtras?: Record<string, any>) {
    super({
      statusCode: HttpStatus.NOT_FOUND,
      codigo: 'ASSINATURA_NAO_ENCONTRADA_ERROR',
      mensagem: 'Assinatura não encontrada.',
      dados: dadosExtras,
    });
  }
}

export { AssinaturaNaoEncontradaException };
export default AssinaturaNaoEncontradaException;
