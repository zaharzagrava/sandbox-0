import * as firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBKIhgWwpaPkkvBC3hPnkVLFD77dAN3MS0',
  authDomain: 'sandbox-0-9b0fb.firebaseapp.com',
  databaseURL: 'https://sandbox-0-9b0fb.firebaseio.com',
  projectId: 'sandbox-0-9b0fb',
  storageBucket: 'sandbox-0-9b0fb.appspot.com',
  messagingSenderId: '567540248172',
  appId: '1:567540248172:web:b8ef6638dfb7bbe8ecf249',
  measurementId: 'G-6ET7PKN5F2',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const getIdToken = async (): Promise<string> => {
  const firebaseUser = firebase.auth().currentUser;

  // (IF
  if (firebaseUser === null) throw new Error('firebaseUser === null');
  // IF)

  const idToken = await firebaseUser.getIdToken();

  // (IF
  if (idToken === '') throw new Error(`idToken === ''`);
  // IF)

  return idToken;
};

export { firebase };
