import { NestFactory } from '@nestjs/core';
import { AppModule } from './adaptadores/app.module';
import { ExcecaoFilter } from './adaptadores/web/filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new ExcecaoFilter());
  await app.listen(3000);
}

bootstrap();
