"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicoBase = void 0;
class ServicoBase {
    constructor(repositorio, criarModelo) {
        this.repositorio = repositorio;
        this.criarModelo = criarModelo;
    }
    onde(campo, operador, valor) {
        this.repositorio.onde(campo, operador, valor);
        return this;
    }
    ou() {
        this.repositorio.ou();
        return this;
    }
    ordenarPor(campo, direcao) {
        this.repositorio.ordenarPor(campo, direcao);
        return this;
    }
    async buscar() {
        const items = await this.repositorio.buscar();
        return items.map(this.criarModelo);
    }
    async buscarPorId(id) {
        const item = await this.repositorio.buscarPorId(id);
        if (!item)
            return null;
        return this.criarModelo(item);
    }
    async atualizar(id, dados) {
        const item = await this.buscarPorId(id);
        if (!item)
            throw new Error('Entidade não encontrada!');
        const atualizado = await this.repositorio.atualizar(id, dados);
        return this.criarModelo(atualizado);
    }
    async excluir(id) {
        const item = await this.buscarPorId(id);
        if (!item)
            throw new Error('Entidade não encontrada!');
        await this.repositorio.excluir(id);
    }
    async criar(dados) {
        const criado = await this.repositorio.criar(dados);
        return this.criarModelo(criado);
    }
}
exports.ServicoBase = ServicoBase;
exports.default = ServicoBase;
//# sourceMappingURL=ServicoBase.js.map