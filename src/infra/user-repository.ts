import { User } from '@/model/user';
import { firestore } from '@/shared/firebase';
import { Injectable } from '@nestjs/common';

const collectionName = 'users';

@Injectable()
export class UserRepository {
  static async createUser(params: User): Promise<void> {
    await firestore.collection(collectionName).doc(params.id).set(params);
  }

  static async ofId(id: string): Promise<User | undefined> {
    const doc = await firestore.collection(collectionName).doc(id).get();

    if (!doc.exists) return undefined;

    return doc.data() as User;
  }

  static async listAll(): Promise<User[]> {
    return await (
      await firestore.collection(collectionName).get()
    ).docs.map((it) => ({
      id: it.get('id'),
      name: it.get('name'),
    }));
  }

  static async deleteById(id: string): Promise<void> {
    await firestore.collection(collectionName).doc(id).delete();
  }
}
