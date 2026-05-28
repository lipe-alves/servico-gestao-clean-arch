import { HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

class CustoFinalNegativoException extends RpcException {
  public constructor(dadosExtras?: Record<string, any>) {
    super({
      statusCode: HttpStatus.BAD_REQUEST,
      codigo: 'CUSTO_FINAL_INVALIDO_ERROR',
      mensagem: 'O custo final não pode ser igual ou menor que zero.',
      dados: dadosExtras,
    });
  }
}

export { CustoFinalNegativoException };
export default CustoFinalNegativoException;
