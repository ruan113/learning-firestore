import {
  app,
  initializeNestApp,
  tearDownNestApp,
} from '@/test/_config/configure-nest';
import { TestHttpClient } from '@/test/_config/test-http-client';

export let testHttpClient: TestHttpClient;

export async function initializeTestServer(): Promise<void> {
  configureEnv();
  await validateIfFirebaseEmulatorsWereStarted();
  await initializeNestApp();
  testHttpClient = new TestHttpClient(app?.getHttpServer());
}

export async function tearDownTestServer(): Promise<void> {
  await tearDownNestApp();
}

async function validateIfFirebaseEmulatorsWereStarted(): Promise<void> {
  const waitPortAndFailOnTimeout = async (port: number): Promise<void> => {
    try {
      const result = await testHttpClient.get('127.0.0.1:8080');
      if (result.status !== 200) throw Error();
    } catch (error) {
      console.log(
        `Emulator not initialized on port ${port}, catch error: ${JSON.stringify(error)}`,
      );
    }
  };

  await waitPortAndFailOnTimeout(8080);
}

function configureEnv(): void {
  process.env = {
    ...process.env,
    FIRESTORE_EMULATOR_HOST: '127.0.0.1:8080',
    APP_ENV: 'test',
  };
}
