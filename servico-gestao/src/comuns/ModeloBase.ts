import { Json } from './tipos';

class ModeloBase<E extends object> {
  protected dados: E;

  public constructor(dados: E) {
    this.dados = dados;
  }

  public paraJson(): Json<E> {
    return JSON.parse(JSON.stringify(this.dados));
  }
}

export default ModeloBase;
export { ModeloBase };
