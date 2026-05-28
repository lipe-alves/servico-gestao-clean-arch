import { HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

class NomeDuplicadoException extends RpcException {
  public constructor(dadosExtras?: Record<string, any>) {
    super({
      statusCode: HttpStatus.BAD_REQUEST,
      codigo: 'CLIENTE_NOME_DUPLICADO_ERROR',
      mensagem: 'Nome do cliente já cadastrado.',
      dados: dadosExtras,
    });
  }
}

export { NomeDuplicadoException };
export default NomeDuplicadoException;
