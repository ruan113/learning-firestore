import * as admin from 'firebase-admin';

const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
};

admin.initializeApp(firebaseConfig);
export const firestore = admin.firestore();
