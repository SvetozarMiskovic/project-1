import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCIlxjwQGnPt33mXXTdCg_vpfwXLlcqE9g',
  authDomain: 'usermanagement-f05bf.firebaseapp.com',
  projectId: 'usermanagement-f05bf',
  storageBucket: 'usermanagement-f05bf.appspot.com',
  messagingSenderId: '166577639290',
  appId: '1:166577639290:web:412d854ae9760d79b490c3',
  measurementId: 'G-94LF034DD8',
};

const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);

export default firebaseApp;
