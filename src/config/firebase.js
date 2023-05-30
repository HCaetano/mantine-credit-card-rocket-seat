import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAqZO4Yawwb8yXbHuZHSfR0yuKkCKMoYD4",
  authDomain: "credit-card-register.firebaseapp.com",
  projectId: "credit-card-register",
  storageBucket: "credit-card-register.appspot.com",
  messagingSenderId: "1086813762476",
  appId: "1:1086813762476:web:65ca9ddbec082ee6694009",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
