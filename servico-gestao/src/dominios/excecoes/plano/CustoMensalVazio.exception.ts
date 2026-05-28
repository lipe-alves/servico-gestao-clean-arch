import { HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

class CustoMensalVazioException extends RpcException {
  public constructor(dadosExtras?: Record<string, any>) {
    super({
      statusCode: HttpStatus.BAD_REQUEST,
      codigo: 'CUSTO_MENSAL_VAZIO_ERROR',
      mensagem: 'O custo mensal do plano não pode estar vazio.',
      dados: dadosExtras,
    });
  }
}

export { CustoMensalVazioException };
export default CustoMensalVazioException;
