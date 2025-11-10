interface ICasoUso {
  executar(...args: any[]): Promise<any> | any;
}

export default ICasoUso;
export { ICasoUso };
