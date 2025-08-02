import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Конфигурация Firebase вашего проекта
const firebaseConfig = {
  apiKey: "AIzaSyC1RRJrPawAM4ySbVM1-XsmV0Ode21RXSY",
  authDomain: "english-game-edfec.firebaseapp.com",
  projectId: "english-game-edfec",
  storageBucket: "english-game-edfec.appspot.com",
  messagingSenderId: "717018391580",
  appId: "1:717018391580:web:9a0b43fd595da2d56c2bd9",
  measurementId: "G-H2PS3Q826Q"
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);

// Инициализация сервисов Firebase
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, googleProvider, db, storage };