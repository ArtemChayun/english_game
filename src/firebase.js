// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// Якщо хочеш використовувати аналітику, розкоментуй наступний рядок:
// import { getAnalytics } from 'firebase/analytics';

// Твої дані конфігурації Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC1RRJrPawAM4ySbVM1-XsmV0Ode21RXSY",
  authDomain: "english-game-edfec.firebaseapp.com",
  projectId: "english-game-edfec",
  storageBucket: "english-game-edfec.appspot.com", // виправив тут: має бути *.app**spot**.com
  messagingSenderId: "717018391580",
  appId: "1:717018391580:web:9a0b43fd595da2d56c2bd9",
  measurementId: "G-H2PS3Q826Q"
};

// Ініціалізація Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Якщо потрібно — ініціалізуй аналітику:
// const analytics = getAnalytics(app);

export { auth };