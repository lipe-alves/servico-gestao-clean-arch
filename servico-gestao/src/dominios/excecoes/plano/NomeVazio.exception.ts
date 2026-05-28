import { HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

class NomeVazioException extends RpcException {
  public constructor(dadosExtras?: Record<string, any>) {
    super({
      statusCode: HttpStatus.BAD_REQUEST,
      codigo: 'PLANO_NOME_VAZIO_ERROR',
      mensagem: 'O nome do plano não pode estar vazio.',
      dados: dadosExtras,
    });
  }
}

export { NomeVazioException };
export default NomeVazioException;
