import { configureApp } from '@/main/app';
import { AppModule } from '@/main/app.module';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';

export let app: INestApplication | undefined;

export async function initializeNestApp(): Promise<void> {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();
  app = moduleRef.createNestApplication();
  configureApp(app);
  await app.init();
}

export async function tearDownNestApp(): Promise<void> {
  await app?.close();
}
