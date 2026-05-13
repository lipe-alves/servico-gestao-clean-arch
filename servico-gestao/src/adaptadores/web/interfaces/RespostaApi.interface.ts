import { HttpStatus } from '@nestjs/common';

interface IRespostaApi<T extends object = {}> {
  statusCode: HttpStatus;
  codigo: string;
  mensagem: string;
  dados?: T;
}

export default IRespostaApi;
export { IRespostaApi };
