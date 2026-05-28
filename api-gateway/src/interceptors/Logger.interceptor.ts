import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
class LoggerInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  public intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, body = {}, params = {}, query = {} } = request;
    const now = Date.now();

    this.logger.log(`[INÍCIO] ${method} ${url}`);

    if (Object.keys(body).length > 0) {
      this.logger.debug(`Body: ${JSON.stringify(body, null, 2)}`);
    }

    if (Object.keys(params).length > 0) {
      this.logger.debug(`Params: ${JSON.stringify(params, null, 2)}`);
    }

    if (Object.keys(query).length > 0) {
      this.logger.debug(`Query: ${JSON.stringify(query, null, 2)}`);
    }

    return next.handle().pipe(
      tap((data) => {
        const delay = Date.now() - now;
        this.logger.log(`[FIM] ${method} ${url} - ${delay}ms`);

        if (data) {
          this.logger.debug(`Resultado: ${JSON.stringify(data, null, 2)}`);
        }
      })
    );
  }
}

export { LoggerInterceptor };
export default LoggerInterceptor;
