import { HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

class CustoMensalNegativoException extends RpcException {
  public constructor(dadosExtras?: Record<string, any>) {
    super({
      statusCode: HttpStatus.BAD_REQUEST,
      codigo: 'CUSTO_MENSAL_INVALIDO_ERROR',
      mensagem: 'O custo mensal não pode ser igual ou menor que zero.',
      dados: dadosExtras,
    });
  }
}

export { CustoMensalNegativoException };
export default CustoMensalNegativoException;
