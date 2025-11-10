import IRepositorioBase, {
  Operador,
  Direcao,
} from './RepositorioBase.interface';
import ModeloBase from 'src/comuns/ModeloBase';

interface IServicoBase<E extends object, M extends ModeloBase<E>> {
  onde(
    campo: string,
    operador: Operador,
    valor: string | number | boolean,
  ): IServicoBase<E, M>;
  ou(): IServicoBase<E, M>;
  ordenarPor(campo: string, direcao: Direcao): IServicoBase<E, M>;
  buscar(): Promise<M[]>;
  buscarPorId(id: number): Promise<M | null>;
  criar(dados: Omit<E, 'codigo'>): Promise<M>;
  atualizar(id: number, dados: Partial<E>): Promise<M>;
  excluir(id: number): Promise<void>;
}

export default IServicoBase;
export { IServicoBase, Operador, Direcao };
