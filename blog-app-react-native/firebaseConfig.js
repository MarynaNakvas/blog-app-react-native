import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA3z-3v-5Si81EI4vFi5H86NV8k7vKlLQ8",
  authDomain: "blog-app-react-native.firebaseapp.com",
  databaseURL: "https://blog-app-react-native-default-rtdb.firebaseio.com",
  projectId: "blog-app-react-native",
  storageBucket: "blog-app-react-native.appspot.com",
  messagingSenderId: "1091055901967",
  appId: "1:1091055901967:web:7fc183d7a4174caeb8727a"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export default app;
