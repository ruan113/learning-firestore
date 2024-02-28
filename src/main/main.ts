import getApp from '@/main/app';

async function bootstrap() {
  const app = await getApp();
  await app.listen(3000);
}
bootstrap();
