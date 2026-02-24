import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
  StreamableFile,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

export interface ResponseWrapper<T> {
  data?: T;
  message?: string;
}

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<ResponseWrapper<T>, any>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<ResponseWrapper<T>>,
  ): Observable<any> {
    const http = context.switchToHttp();
    const response = http.getResponse();
    response.status(HttpStatus.OK);

    return next.handle().pipe(
      map((response: ResponseWrapper<T>) => {
        if (
          typeof response === 'string' ||
          Buffer.isBuffer(response) ||
          response instanceof StreamableFile
        ) {
          return response;
        }
        if (Array.isArray(response)) {
          return {
            success: true,
            code: HttpStatus.OK,
            data: response,
            message: 'OK',
            errors: null,
          };
        }

        const { message = 'OK', ...rest } = response || {};

        return {
          success: true,
          code: HttpStatus.OK,
          data: rest,
          message,
          errors: null,
        };
      }),
    );
  }
}
