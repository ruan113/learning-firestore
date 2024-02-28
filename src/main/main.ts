import getApp from '@/main/app';
import { configDotenv } from 'dotenv';

configDotenv();

async function bootstrap() {
  const app = await getApp();
  await app.listen(3000);
}

bootstrap();
