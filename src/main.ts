import {
  BadRequestException,
  Logger,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';

import { AppModule } from '@/app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const port: number = configService.getOrThrow<number>('app.http.port');

  const globalPrefix: string =
    configService.getOrThrow<string>('app.globalPrefix');

  const versioningPrefix: string = configService.getOrThrow<string>(
    'app.versioning.prefix',
  );

  const version: string = configService.getOrThrow<string>(
    'app.versioning.version',
  );

  const logger = new Logger();

  app.setGlobalPrefix(globalPrefix);

  //collection of smaller middleware functions that set security-related HTTP headers
  app.use(helmet());

  // ensure all endpoints are protected from receiving incorrect data
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => new BadRequestException(errors),
      whitelist: true,
      transform: true,
    }),
  );

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: version,
    prefix: versioningPrefix,
  });

  // documentation setup
  const config = new DocumentBuilder()
    .setTitle('Task Manager API Docs')
    .setDescription('The task manager API documentation')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
      },
      'Authorization',
    )
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);

  await app.listen(port);

  logger.log(`==========================================================`);

  logger.log(
    `🚀 Http Server running on ${await app.getUrl()}${globalPrefix}/${versioningPrefix}${version}`,
    'NestApplication',
  );

  logger.log(`==========================================================`);

  logger.log(`==========================================================`);

  logger.log(
    `🚀 Application Docs is running on ${await app.getUrl()}/docs`,
    'NestApplication',
  );

  logger.log(`==========================================================`);
}
bootstrap();
