import { Repository, SelectQueryBuilder, ObjectLiteral } from 'typeorm';
import {
  IRepositorioBase,
  Operador,
  Direcao,
} from '../dominios/interfaces/RepositorioBase.interface';

class RepositorioBase<T extends ObjectLiteral> implements IRepositorioBase<T> {
  private readonly repositorio: Repository<T>;
  private readonly alias: string;
  private queryBuilder: SelectQueryBuilder<T>;
  private orMode = false;

  public constructor(entidade: { new (): T }, repositorio: Repository<T>) {
    this.repositorio = repositorio;
    this.alias = entidade.name.toLowerCase();
    this.queryBuilder = this.repositorio.createQueryBuilder(this.alias);
  }

  public onde(
    campo: string,
    operador: Operador,
    valor: string | number | boolean,
  ): IRepositorioBase<T> {
    const parametro = `${campo}_${Math.random().toString(36).substring(2, 8)}`;
    const condicao = this.montarCondicao(campo, operador, parametro);

    if (this.orMode) {
      this.queryBuilder.orWhere(condicao, { [parametro]: valor });
      this.orMode = false;
    } else {
      this.queryBuilder.andWhere(condicao, { [parametro]: valor });
    }

    return this;
  }

  public ou(): IRepositorioBase<T> {
    this.orMode = true;
    return this;
  }

  public ordenarPor(campo: string, direcao: Direcao): IRepositorioBase<T> {
    this.queryBuilder.addOrderBy(
      `${this.alias}.${campo}`,
      direcao.toUpperCase() as 'ASC' | 'DESC',
    );
    return this;
  }

  public async buscar(): Promise<T[]> {
    const resultados = await this.queryBuilder.getMany();
    this.resetar();
    return resultados;
  }

  public async buscarPorId(id: number): Promise<T | null> {
    const resultado = await this.repositorio.findOneBy({ codigo: id } as any);
    this.resetar();
    return resultado;
  }

  public async atualizar(id: number, dados: Partial<T>): Promise<T> {
    await this.repositorio.update(id, dados as any);
    this.resetar();
    const atualizado = await this.buscarPorId(id);
    if (!atualizado)
      throw new Error('Registro não encontrado após atualização.');
    return atualizado;
  }

  public async excluir(id: number): Promise<void> {
    await this.repositorio.delete(id);
    this.resetar();
  }

  public async criar(dados: T): Promise<T> {
    const entidade = this.repositorio.create(dados);
    const entidadeSalva = await this.repositorio.save(entidade);
    return entidadeSalva;
  }

  private resetar() {
    this.queryBuilder = this.repositorio.createQueryBuilder(this.alias);
  }

  private montarCondicao(
    campo: string,
    operador: Operador,
    parametro: string,
  ): string {
    const coluna = `${this.alias}.${campo}`;
    switch (operador) {
      case '=':
      case '<=':
      case '<':
      case '>=':
      case '>':
        return `${coluna} ${operador} :${parametro}`;
      case 'in':
        return `${coluna} IN (:...${parametro})`;
      case 'not in':
        return `${coluna} NOT IN (:...${parametro})`;
      default:
        throw new Error(`Operador inválido: ${operador}`);
    }
  }
}

export default RepositorioBase;
export { RepositorioBase };
