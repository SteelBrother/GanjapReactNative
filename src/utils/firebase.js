// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBpErK9pdmYqKlljM7s5ADLqy4h0MHgzeM",
  authDomain: "ganjappmovil.firebaseapp.com",
  projectId: "ganjappmovil",
  storageBucket: "ganjappmovil.appspot.com",
  messagingSenderId: "623247761126",
  appId: "1:623247761126:web:f2b4faca1c0d5aa8e8a527"
};

// Inicializa Firebase y exporta los servicios que se necesiten
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
