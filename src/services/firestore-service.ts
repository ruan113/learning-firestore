import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FirestoreService {
  private readonly firestore: admin.firestore.Firestore;

  constructor() {
    this.firestore = admin.firestore();
    this.firestore.settings({});
  }

  getFirestore(): admin.firestore.Firestore {
    return this.firestore;
  }
}
