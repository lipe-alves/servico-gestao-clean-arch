import { Repository, ObjectLiteral } from "typeorm";
type Operador = "=" | "<=" | "<" | ">=" | ">" | "in" | "not in";
type Direcao = "asc" | "desc";
interface IRepositorioBase<T> {
    onde(campo: string, operador: Operador, valor: string | number | boolean): IRepositorioBase<T>;
    ou(): IRepositorioBase<T>;
    ordenarPor(campo: string, direcao: Direcao): IRepositorioBase<T>;
    buscar(): Promise<T[]>;
    buscarPorId(id: number): Promise<T | null>;
    atualizar(id: number, dados: Partial<T>): Promise<T>;
    excluir(id: number): Promise<void>;
    criar(dados: Omit<T, "codigo">): Promise<T>;
}
declare class RepositorioBase<T extends ObjectLiteral> implements IRepositorioBase<T> {
    private readonly repositorio;
    private readonly alias;
    private queryBuilder;
    private orMode;
    constructor(entidade: {
        new (): T;
    }, repositorio: Repository<T>);
    onde(campo: string, operador: Operador, valor: string | number | boolean): IRepositorioBase<T>;
    ou(): IRepositorioBase<T>;
    ordenarPor(campo: string, direcao: Direcao): IRepositorioBase<T>;
    buscar(): Promise<T[]>;
    buscarPorId(id: number): Promise<T | null>;
    atualizar(id: number, dados: Partial<T>): Promise<T>;
    excluir(id: number): Promise<void>;
    criar(dados: T): Promise<T>;
    private resetar;
    private montarCondicao;
}
export default RepositorioBase;
export { RepositorioBase };
export type { IRepositorioBase, Operador, Direcao };
