import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  
  const logger = app.get(Logger);
  logger.log('Starting NestJS application...', 'Bootstrap');
  
  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('Authentication API')
    .setDescription('API documentation for the authentication service')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      stopAtFirstError: true,
      transform: true,
      errorHttpStatusCode: 400,
    })
  );

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  logger.log(`Application is running on: http://localhost:${port}`, 'Bootstrap');
  logger.log(`Swagger documentation available at: http://localhost:${port}/api`, 'Bootstrap');
}
bootstrap();
