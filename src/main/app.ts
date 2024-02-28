import { AppModule } from '@/main/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';

let app: INestApplication;

export function configureApp(appModule: INestApplication): void {
  appModule.enableCors();
  appModule.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
}

async function createAppModule(): Promise<NestExpressApplication> {
  const appModule = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
  );

  configureApp(appModule);

  return appModule;
}

export default async function getApp(): Promise<INestApplication> {
  if (!app) {
    app = await createAppModule();
    await app.init();
  }
  return app;
}
