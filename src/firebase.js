// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBfV-T5TEKIQXT4QKAIOiyp0UeXT3m_Wso",
  authDomain: "mittal-main-7dd8c.firebaseapp.com",
  projectId: "mittal-main-7dd8c",
  storageBucket: "mittal-main-7dd8c.firebasestorage.app",
  messagingSenderId: "683834143988",
  appId: "1:683834143988:web:33c32de8c6f0ca2b485aa1",
  measurementId: "G-KM7RTMSTM5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app)