import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
class TransformaStatusInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const response = context.switchToHttp().getResponse();

        if (data && data.statusCode) {
          response.status(data.statusCode);
        }

        return data;
      })
    );
  }
}

export default TransformaStatusInterceptor;
export { TransformaStatusInterceptor };