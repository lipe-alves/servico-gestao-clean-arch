import { HttpStatus } from '@nestjs/common';
import IRespostaApi from '../interfaces/RespostaApi.interface';

class ControllerBase {
  public sucesso<T extends object = {}>(
    mensagem: string,
    dados?: T,
    statusCode: HttpStatus = HttpStatus.OK
  ): IRespostaApi<T> {
    return {
      statusCode,
      codigo: 'SUCESSO',
      mensagem,
      dados,
    };
  }
}

export default ControllerBase;
export { ControllerBase };
