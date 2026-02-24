import { BadRequestException, ValidationPipe } from '@nestjs/common';

export const validationPipe = new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
  transformOptions: {
    enableImplicitConversion: true,
  },
  exceptionFactory: (validationErrors = []) => {
  const flattenErrors = (errors) => {
    const result: { property: string; constraints: object }[] = [];

    for (const err of errors) {
      if (err.constraints) {
        result.push({
          property: err.property,
          constraints: err.constraints,
        });
      }

      if (err.children && err.children.length > 0) {
        result.push(...flattenErrors(err.children));
      }
    }

    return result;
  };

  return new BadRequestException({
    message: 'Validation failed',
    errors: flattenErrors(validationErrors),
  });
},
});
