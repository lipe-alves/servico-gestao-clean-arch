import { HttpStatus } from '@nestjs/common';
import IRespostaApi from '../interfaces/RespostaApi.interface';

class ControllerBase {
  public sucesso<T extends object = {}>(
    mensagem: string,
    dados?: T
  ): IRespostaApi<T> {
    return {
      statusCode: HttpStatus.OK,
      codigo: 'SUCESSO',
      mensagem,
      dados,
    };
  }

  public falha<T extends object>(erro: Error, dados?: T): IRespostaApi<T> {
    return {
      codigo: 'ERRO',
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      mensagem: erro.message,
      dados,
    };
  }
}

export default ControllerBase;
export { ControllerBase };
