import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const exceptiontRes = exception.getResponse();
    console.log(exceptiontRes)
    const error =
      typeof exceptiontRes === 'string'
        ? { message: exceptiontRes }
        : (exceptiontRes as object);
    response.status(status).json({
      statusCode: status,
      data: {
        ...error
      },
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
