import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';

let app: INestApplication;

async function bootstrap(): Promise<INestApplication> {
  if (!app) {
    app = await NestFactory.create(AppModule, {
      logger: ['error', 'warn'],
    });
    app.enableCors();
    await app.init();
    console.log('Application initialized');
  }
  return app;
}

export default async (req, res) => {
  const app = await bootstrap();
  const server = app.getHttpAdapter().getInstance();
  return server(req, res);
};

if (process.env.NODE_ENV !== 'production') {
  bootstrap()
    .then((app) => {
      const port = process.env.PORT || 3001;
      app.listen(port, () => {
        console.log(`Server running on port ${port}`);
      });
    })
    .catch(console.error);
}
