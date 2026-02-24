import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from './config/env.config';
import { AppDataSource } from './config/data-source.config';
import { SwaggerModule } from '@nestjs/swagger';
import { LocalSeeder, MasterSeeder } from './database/seeders/index.seeder';
import { ResponseInterceptor } from './common/interceptors/index.interceptor';
import { HttpExceptionFilter } from './common/filters/index.filter';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { BaseResponseDto } from './common/dtos/index.dto';
import { corsConfig } from './config/cors.config';
import { validationPipe } from './config/validation.config';
import { apiDocConfig } from './config/api-doc.config';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  // Initialize TypeORM DataSource
  await AppDataSource.initialize();

  // Run pending migrations automatically
  await AppDataSource.runMigrations();
  console.log('Migrations completed');

  const masterSeeder = new MasterSeeder(AppDataSource);
  await masterSeeder.run();

  if (env.APP.ENV === 'local') {
    const seeder = new LocalSeeder(AppDataSource);
    console.log('Running local seeder');
    await seeder.run();
  }

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.set('trust proxy', true);

  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalFilters(new HttpExceptionFilter());

  const documentFactory = () =>
    SwaggerModule.createDocument(app, apiDocConfig, {
      extraModels: [BaseResponseDto],
    });
  SwaggerModule.setup('api', app, documentFactory);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.useGlobalPipes(validationPipe);

  app.enableCors(corsConfig);

  await app.listen(env.APP.PORT);
}
bootstrap();
