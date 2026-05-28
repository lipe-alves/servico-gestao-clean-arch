import { Json } from "./tipos";
declare class ModeloBase<E extends object> {
    protected dados: E;
    constructor(dados: E);
    paraJson(): Json<E>;
}
export default ModeloBase;
export { ModeloBase };
