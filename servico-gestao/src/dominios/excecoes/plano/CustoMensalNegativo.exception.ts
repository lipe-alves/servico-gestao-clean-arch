import { BadRequestException, HttpStatus } from '@nestjs/common';

class CustoMensalNegativoException extends BadRequestException {
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
