import { HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

class NomeDuplicadoException extends RpcException {
  public constructor(dadosExtras?: Record<string, any>) {
    super({
      statusCode: HttpStatus.BAD_REQUEST,
      codigo: 'PLANO_NOME_DUPLICADO_ERROR',
      mensagem: 'Já existe um plano com esse nome.',
      dados: dadosExtras,
    });
  }
}

export { NomeDuplicadoException };
export default NomeDuplicadoException;
