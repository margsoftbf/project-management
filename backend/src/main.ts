import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const port = process.env.PORT || 3001;
  await app.listen(port);
}

let server;
async function bootstrapServer() {
  if (!server) {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    await app.init();
    server = app.getHttpAdapter().getInstance();
  }
  return server;
}

export default bootstrapServer;

if (process.env.NODE_ENV !== 'production') {
  bootstrap();
}
