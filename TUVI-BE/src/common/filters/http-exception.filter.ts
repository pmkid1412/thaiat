import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const responseCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const status =
      responseCode !== HttpStatus.UNAUTHORIZED
        ? HttpStatus.OK
        : HttpStatus.UNAUTHORIZED;

    const res =
      exception instanceof HttpException ? exception.getResponse() : exception;

    let errors: Record<string, string[]> | null = null;

    if (typeof res === 'object' && res.message && Array.isArray(res.message)) {
      errors = { _global: res.message };
    }

    if (Array.isArray(res.errors)) {
      errors = {};
      for (const err of res.errors) {
        if (err.property && err.constraints) {
          errors[err.property] = Object.values(err.constraints);
        }
      }
    }

    response.status(status).json({
      success: false,
      code: responseCode,
      data: null,
      message:
        res.message && typeof res.message === 'string'
          ? res.message
          : 'Validation failed',
      errors,
    });
  }
}
