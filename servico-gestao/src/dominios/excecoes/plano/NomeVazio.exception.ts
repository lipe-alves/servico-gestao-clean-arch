import { BadRequestException, HttpStatus } from '@nestjs/common';

class NomeVazioException extends BadRequestException {
  public constructor(dadosExtras?: Record<string, any>) {
    super({
      statusCode: HttpStatus.BAD_REQUEST,
      codigo: 'PLANO_NOME_VAZIO_ERROR',
      mensagem: 'O nome do plano não pode estar vazio.',
      extra: dadosExtras,
    });
  }
}

export { NomeVazioException };
export default NomeVazioException;
