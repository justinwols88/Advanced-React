// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDaAZjfE2DywqBezLQtGApSty-hfJNudwU",
  authDomain: "fir-e10f8.firebaseapp.com",
  projectId: "fir-e10f8",
  storageBucket: "fir-e10f8.firebasestorage.app",
  messagingSenderId: "973438742250",
  appId: "1:973438742250:web:a6f70efe3d6b3d3ac9b193"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;