import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { Env } from 'src/util/env';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const port: number = Env.Port;
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder().addBearerAuth()
    .setTitle('Image Repository')
    .setDescription('Shopify Developer Intern Challenge')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('', app, document);

  app.enableCors();
  await app.listen(port);
  Logger.log('info', `Server running on http://localhost:${port}`);
}
bootstrap();
