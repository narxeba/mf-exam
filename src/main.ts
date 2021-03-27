import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AspectLogger } from './common/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new AspectLogger());
  await app.listen(process.env.PORT || 80);
}
bootstrap();
