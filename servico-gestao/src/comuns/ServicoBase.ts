import IRepositorioBase from '../dominios/interfaces/RepositorioBase.interface';
import IServicoBase, {
  Operador,
  Direcao,
} from '../dominios/interfaces/ServicoBase.interface';
import ModeloBase from './ModeloBase';

class ServicoBase<E extends object, M extends ModeloBase<E>>
  implements IServicoBase<E, M>
{
  protected readonly repositorio: IRepositorioBase<E>;
  protected readonly criarModelo: (entidade: E) => M;

  public constructor(
    repositorio: IRepositorioBase<E>,
    criarModelo: (entidade: E) => M,
  ) {
    this.repositorio = repositorio;
    this.criarModelo = criarModelo;
  }

  public onde(
    campo: string,
    operador: Operador,
    valor: string | number | boolean,
  ): this {
    this.repositorio.onde(campo, operador, valor);
    return this;
  }

  public ou(): this {
    this.repositorio.ou();
    return this;
  }

  public ordenarPor(campo: string, direcao: Direcao): this {
    this.repositorio.ordenarPor(campo, direcao);
    return this;
  }

  public async buscar(): Promise<M[]> {
    const items = await this.repositorio.buscar();
    return items.map(this.criarModelo);
  }

  public async buscarPorId(id: number): Promise<M | null> {
    const item = await this.repositorio.buscarPorId(id);
    if (!item) return null;
    return this.criarModelo(item);
  }

  public async atualizar(id: number, dados: Partial<E>): Promise<M> {
    const item = await this.buscarPorId(id);
    if (!item) throw new Error("Entidade não encontrada!");
    const atualizado = await this.repositorio.atualizar(id, dados);
    return this.criarModelo(atualizado);
  }

  public async excluir(id: number): Promise<void> {
    const item = await this.buscarPorId(id);
    if (!item) throw new Error("Entidade não encontrada!");
    await this.repositorio.excluir(id);
  }

  public async criar(dados: Omit<E, 'codigo'>): Promise<M> {
    const criado = await this.repositorio.criar(dados);
    return this.criarModelo(criado);
  }
}

export default ServicoBase;
export { ServicoBase };
