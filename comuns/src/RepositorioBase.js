"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositorioBase = void 0;
class RepositorioBase {
    constructor(entidade, repositorio) {
        this.orMode = false;
        this.repositorio = repositorio;
        this.alias = entidade.name.toLowerCase();
        this.queryBuilder = this.repositorio.createQueryBuilder(this.alias);
    }
    onde(campo, operador, valor) {
        const parametro = `${campo}_${Math.random().toString(36).substring(2, 8)}`;
        const condicao = this.montarCondicao(campo, operador, parametro);
        if (this.orMode) {
            this.queryBuilder.orWhere(condicao, { [parametro]: valor });
            this.orMode = false;
        }
        else {
            this.queryBuilder.andWhere(condicao, { [parametro]: valor });
        }
        return this;
    }
    ou() {
        this.orMode = true;
        return this;
    }
    ordenarPor(campo, direcao) {
        this.queryBuilder.addOrderBy(`${this.alias}.${campo}`, direcao.toUpperCase());
        return this;
    }
    async buscar() {
        const resultados = await this.queryBuilder.getMany();
        this.resetar();
        return resultados;
    }
    async buscarPorId(id) {
        const resultado = await this.repositorio.findOneBy({ codigo: id });
        this.resetar();
        return resultado;
    }
    async atualizar(id, dados) {
        await this.repositorio.update(id, dados);
        this.resetar();
        const atualizado = await this.buscarPorId(id);
        if (!atualizado)
            throw new Error("Registro não encontrado após atualização.");
        return atualizado;
    }
    async excluir(id) {
        await this.repositorio.delete(id);
        this.resetar();
    }
    async criar(dados) {
        const entidade = this.repositorio.create(dados);
        const entidadeSalva = await this.repositorio.save(entidade);
        return entidadeSalva;
    }
    resetar() {
        this.queryBuilder = this.repositorio.createQueryBuilder(this.alias);
    }
    montarCondicao(campo, operador, parametro) {
        const coluna = `${this.alias}.${campo}`;
        switch (operador) {
            case "=":
            case "<=":
            case "<":
            case ">=":
            case ">":
                return `${coluna} ${operador} :${parametro}`;
            case "in":
                return `${coluna} IN (:...${parametro})`;
            case "not in":
                return `${coluna} NOT IN (:...${parametro})`;
            default:
                throw new Error(`Operador inválido: ${operador}`);
        }
    }
}
exports.RepositorioBase = RepositorioBase;
exports.default = RepositorioBase;
//# sourceMappingURL=RepositorioBase.js.map