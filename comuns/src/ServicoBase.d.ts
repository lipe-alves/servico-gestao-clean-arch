import { IRepositorioBase, Operador, Direcao } from './RepositorioBase';
import ModeloBase from './ModeloBase';
interface IServicoBase<E extends object, M extends ModeloBase<E>> {
    onde(campo: string, operador: Operador, valor: string | number | boolean): IServicoBase<E, M>;
    ou(): IServicoBase<E, M>;
    ordenarPor(campo: string, direcao: Direcao): IServicoBase<E, M>;
    buscar(): Promise<M[]>;
    buscarPorId(id: number): Promise<M | null>;
    criar(dados: Omit<E, 'codigo'>): Promise<M>;
    atualizar(id: number, dados: Partial<E>): Promise<M>;
    excluir(id: number): Promise<void>;
}
declare class ServicoBase<E extends object, M extends ModeloBase<E>> implements IServicoBase<E, M> {
    protected readonly repositorio: IRepositorioBase<E>;
    protected readonly criarModelo: (entidade: E) => M;
    constructor(repositorio: IRepositorioBase<E>, criarModelo: (entidade: E) => M);
    onde(campo: string, operador: Operador, valor: string | number | boolean): this;
    ou(): this;
    ordenarPor(campo: string, direcao: Direcao): this;
    buscar(): Promise<M[]>;
    buscarPorId(id: number): Promise<M | null>;
    atualizar(id: number, dados: Partial<E>): Promise<M>;
    excluir(id: number): Promise<void>;
    criar(dados: Omit<E, 'codigo'>): Promise<M>;
}
export default ServicoBase;
export { ServicoBase };
export type { IServicoBase };
