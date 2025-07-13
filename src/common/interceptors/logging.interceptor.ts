import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request, Response } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();
    const { method, url, body, query, params } = request;
    const start = Date.now();

    return next.handle().pipe(
      tap((data) => {
        const duration = Date.now() - start;
        const statusCode = response.statusCode;
        
        this.logger.log(
          `${method} ${url} ${statusCode} - ${duration}ms`,
          {
            method,
            url,
            statusCode,
            duration,
            body: process.env.NODE_ENV === 'development' ? body : undefined,
            query: Object.keys(query).length > 0 ? query : undefined,
            params: Object.keys(params).length > 0 ? params : undefined,
          },
        );
      }),
    );
  }
} 