type Operador = '=' | '<=' | '<' | '>=' | '>' | 'in' | 'not in';
type Direcao = 'asc' | 'desc';

interface IRepositorioBase<T> {
  onde(
    campo: string,
    operador: Operador,
    valor: string | number | boolean,
  ): IRepositorioBase<T>;
  ou(): IRepositorioBase<T>;
  ordenarPor(campo: string, direcao: Direcao): IRepositorioBase<T>;
  buscar(): Promise<T[]>;
  buscarPorId(id: number): Promise<T | null>;
  atualizar(id: number, dados: Partial<T>): Promise<T>;
  excluir(id: number): Promise<void>;
  criar(dados: Omit<T, 'codigo'>): Promise<T>;
}

export default IRepositorioBase;
export { IRepositorioBase, Operador, Direcao };
