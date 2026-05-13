import { HttpStatus, NotFoundException } from '@nestjs/common';

class PlanoNaoEncontradoException extends NotFoundException {
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
