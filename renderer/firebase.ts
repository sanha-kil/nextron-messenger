import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FB_API_KEY,
  authDomain: 'nextron-messenger.firebaseapp.com',
  projectId: 'nextron-messenger',
  storageBucket: 'nextron-messenger.appspot.com',
  messagingSenderId: process.env.NEXT_PUBLIC_FB_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FB_APP_ID,
};

export const firebaseApp = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth();
export const firebaseDB = getFirestore();