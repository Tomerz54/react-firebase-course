// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth , GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import { getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB7Vm18LFiK-KkFNqA0OOQgRnhhJVyf0gQ",
  authDomain: "fir-course-3f41f.firebaseapp.com",
  projectId: "fir-course-3f41f",
  storageBucket: "fir-course-3f41f.appspot.com",
  messagingSenderId: "285789576182",
  appId: "1:285789576182:web:f1c005b04d19dca1f605d7",
  measurementId: "G-G1VJM4P9E0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app)
export const storage = getStorage(app)