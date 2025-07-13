import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger } from 'nestjs-pino';
import helmet from 'helmet';
import * as compression from 'compression';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  // Use Pino logger
  app.useLogger(app.get(Logger));

  // Security headers
  app.use(helmet());

  // Compression
  app.use(compression());

  // CORS configuration for production
  const allowedOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',')
    : ['http://localhost:3000', 'https://your-frontend-domain.com'];

  app.enableCors({
    origin: process.env.NODE_ENV === 'production' ? allowedOrigins : true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      disableErrorMessages: false,
      validationError: {
        target: false,
        value: false,
      },
    }),
  );

  // Swagger configuration
  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('ilovesushi API')
      .setDescription('API documentation for ilovesushi application')
      .setVersion('1.0')
      .addTag('ilovesushi')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-docs', app, document);
  }

  // Get port from environment
  const port = process.env.PORT || 3001;

  await app.listen(port, '0.0.0.0');

  const logger = app.get(Logger);
  logger.log(
    `🚀 Application is running on: http://0.0.0.0:${port}`,
    'Bootstrap',
  );

  if (process.env.NODE_ENV !== 'production') {
    logger.log(
      `📚 Swagger documentation: http://localhost:${port}/api-docs`,
      'Bootstrap',
    );
  }
}

bootstrap().catch((err) => {
  console.error('Failed to start application:', err);
  process.exit(1);
});
