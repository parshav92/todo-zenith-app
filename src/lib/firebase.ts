
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDUhZ5qy_yKp1_0Mcym53_yTyKsNOIevJ8",
  authDomain: "todo-fa18b.firebaseapp.com",
  projectId: "todo-fa18b",
  storageBucket: "todo-fa18b.firebasestorage.app",
  messagingSenderId: "286835601807",
  appId: "1:286835601807:web:c9df8ba40c1bc842ee1bfa",
  measurementId: "G-TKGRERKFQG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
