interface IRespostaApi<T extends object = {}> {
  codigo: string;
  mensagem: string;
  dados: T;
}

export default IRespostaApi;
export { IRespostaApi };
