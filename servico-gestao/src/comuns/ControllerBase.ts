import IRespostaApi from '../adaptadores/web/interfaces/RespostaApi.interface';

class ControllerBase {
  public sucesso<T extends object = {}>(
    mensagem: string,
    dados?: T,
  ): IRespostaApi<T> {
    return {
      codigo: 'SUCESSO',
      mensagem,
      dados,
    };
  }

  public falha<T extends object>(erro: Error, dados?: T): IRespostaApi<T> {
    return {
      codigo: 'ERRO',
      mensagem: erro.message,
      dados,
    };
  }
}

export default ControllerBase;
export { ControllerBase };
