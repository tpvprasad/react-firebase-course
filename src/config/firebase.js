import { initializeApp } from "firebase/app";
import {getAuth , GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDtIkmfEynjjLuAGwnXfjlZy2TkDVqO5d8",
  authDomain: "fir-course-f33c9.firebaseapp.com",
  projectId: "fir-course-f33c9",
  storageBucket: "fir-course-f33c9.appspot.com",
  messagingSenderId: "1047923384476",
  appId: "1:1047923384476:web:cf5d41f1b8378cbef3cd59",
  measurementId: "G-TB9XCV4ND2"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);