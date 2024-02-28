import { UserRepository } from '@/infra/user-repository';
import { User } from '@/model/user';
import {
  initializeTestServer,
  tearDownTestServer,
} from '@/test/_config/test-server';
import { v4 } from 'uuid';

describe('User repository integration tests', () => {
  beforeAll(async () => {
    await initializeTestServer();
  });

  afterAll(async () => {
    await tearDownTestServer();
  });

  it('should be able to save user', async () => {
    const userId = v4();
    const userToBeCreated: User = {
      id: userId,
      name: `test-user-${userId}`,
    };
    await UserRepository.createUser({
      id: userId,
      name: `test-user-${userId}`,
    });
    const createdUser = await UserRepository.ofId(userId);
    expect(createdUser).toBeDefined();
    expect(createdUser!.id).toBe(userToBeCreated.id);
    expect(createdUser!.name).toBe(userToBeCreated.name);
    const notExistingUser = await UserRepository.ofId(v4());
    expect(notExistingUser).toBeUndefined();
    const listOfUsers = await UserRepository.listAll();
    expect(listOfUsers.length).toBe(1);
    await UserRepository.deleteById(createdUser!.id);
    const listOfUsersAfterDelete = await UserRepository.listAll();
    expect(listOfUsersAfterDelete.length).toBe(0);
  });
});
