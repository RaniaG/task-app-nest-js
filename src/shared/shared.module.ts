import { Module, Global, ValidationPipe } from '@nestjs/common';
import { LoggerMiddleware } from './logger.middleware';
import { HttpExceptionFilter } from './exception.filter';

@Global()//services available every where
@Module({
    providers: [LoggerMiddleware, HttpExceptionFilter, ValidationPipe],
    exports: [LoggerMiddleware, HttpExceptionFilter, ValidationPipe]
})
export class SharedModule { }
