"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModeloBase = void 0;
class ModeloBase {
    constructor(dados) {
        this.dados = dados;
    }
    paraJson() {
        return JSON.parse(JSON.stringify(this.dados));
    }
}
exports.ModeloBase = ModeloBase;
exports.default = ModeloBase;
//# sourceMappingURL=ModeloBase.js.map