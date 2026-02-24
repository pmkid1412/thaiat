import { DocumentBuilder } from '@nestjs/swagger';

export const apiDocConfig = new DocumentBuilder()
  .setTitle('API docs')
  .setVersion('1.0')
  .addBearerAuth({
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
    name: 'Authorization',
    description: 'Enter JWT token',
    in: 'header',
  })
  .build();
