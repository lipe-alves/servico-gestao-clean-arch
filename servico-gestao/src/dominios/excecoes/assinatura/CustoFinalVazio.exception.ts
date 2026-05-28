import { HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

class CustoFinalVazioException extends RpcException {
  public constructor(dadosExtras?: Record<string, any>) {
    super({
      statusCode: HttpStatus.BAD_REQUEST,
      codigo: 'CUSTO_FINAL_VAZIO_ERROR',
      mensagem: 'O custo final do plano não pode estar vazio.',
      dados: dadosExtras,
    });
  }
}

export { CustoFinalVazioException };
export default CustoFinalVazioException;
